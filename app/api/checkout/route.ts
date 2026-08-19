import { NextResponse } from 'next/server';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const items = body.items || [];

		// If Stripe not configured, return a fallback URL (or error)
		if (!stripeSecret) {
			const fallback = process.env.NEXT_PUBLIC_STRIPE_LINK || null;
			if (fallback) return NextResponse.json({ url: fallback });
			return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
		}

		if (!items || !Array.isArray(items) || items.length === 0) {
			return NextResponse.json({ error: 'No items provided' }, { status: 400 });
		}

		const configuredProductPriceId = process.env.STRIPE_PRICE_FOUNDATIONAL;
		let usableProductPriceId: string | undefined;
		if (configuredProductPriceId) {
			const priceCheck = await fetch(`https://api.stripe.com/v1/prices/${configuredProductPriceId}`, {
				headers: { Authorization: `Bearer ${stripeSecret}` },
			});
			if (priceCheck.ok) usableProductPriceId = configuredProductPriceId;
		}

		// Product catalog
		const productCatalog: Record<string, { price: number; priceId?: string }> = {
			'foundational-3in1-kit': {
				price: 15.0,
				priceId: usableProductPriceId,
			},
		};

		// Build form-encoded body for Stripe Checkout Session create
		const params = new URLSearchParams();
		params.append('payment_method_types[]', 'card');

		// line_items
		items.forEach((i: any, idx: number) => {
			const catalog = i.id ? productCatalog[i.id] : undefined;
			const quantity = Math.max(1, Number(i.quantity || 1));
			if (catalog && catalog.priceId) {
				params.append(`line_items[${idx}][price]`, catalog.priceId);
				params.append(`line_items[${idx}][quantity]`, String(quantity));
			} else if (catalog) {
				// use inline price_data
				params.append(`line_items[${idx}][price_data][currency]`, 'usd');
				params.append(`line_items[${idx}][price_data][product_data][name]`, i.name ?? i.id);
				params.append(`line_items[${idx}][price_data][unit_amount]`, String(Math.round(catalog.price * 100)));
				params.append(`line_items[${idx}][quantity]`, String(quantity));
			} else {
				// fallback inline
				params.append(`line_items[${idx}][price_data][currency]`, 'usd');
				params.append(`line_items[${idx}][price_data][product_data][name]`, i.name ?? 'Item');
				params.append(`line_items[${idx}][price_data][unit_amount]`, String(Math.round((i.price ?? 0) * 100)));
				params.append(`line_items[${idx}][quantity]`, String(quantity));
			}
		});

		// Optional shipping: prefer a Stripe Shipping Rate (shipping_rate ID). If none configured,
		// create a shipping rate dynamically for $5.23 (523 cents) and attach it; otherwise
		// fall back to a flat shipping line item.
		let shippingRateId = process.env.STRIPE_SHIPPING_RATE_ID || process.env.NEXT_PUBLIC_STRIPE_SHIPPING_RATE_ID;
		if (shippingRateId) {
			const shippingCheck = await fetch(`https://api.stripe.com/v1/shipping_rates/${shippingRateId}`, {
				headers: { Authorization: `Bearer ${stripeSecret}` },
			});
			if (!shippingCheck.ok) shippingRateId = undefined;
		}
		let shippingCents = Number(process.env.STRIPE_SHIPPING_PRICE_CENTS ?? 0);

		// If user/deployment didn't configure shipping, default to $5.23 (523 cents) per request
		if (!shippingRateId && shippingCents === 0) {
			shippingCents = 523; // $5.23
		}

		if (shippingRateId) {
			// Attach configured shipping rate to the checkout session
			params.append('shipping_options[0][shipping_rate]', shippingRateId);
		} else if (shippingCents > 0) {
			// Try to create a shipping_rate dynamically using the Stripe API, then attach it.
			let dynamicRateId: string | null = null;
			try {
				const srParams = new URLSearchParams();
				srParams.append('display_name', 'UPS Ground');
				srParams.append('type', 'fixed_amount');
				srParams.append('fixed_amount[amount]', String(shippingCents));
				srParams.append('fixed_amount[currency]', 'usd');
				srParams.append('delivery_estimate[type]', 'fixed');
				srParams.append('delivery_estimate[min]', '2');
				srParams.append('delivery_estimate[max]', '5');
				srParams.append('delivery_estimate[unit]', 'business_day');

				const srRes = await fetch('https://api.stripe.com/v1/shipping_rates', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${stripeSecret}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: srParams.toString(),
				});

				if (srRes.ok) {
					const srData = await srRes.json();
					dynamicRateId = srData.id;
				} else {
					const t = await srRes.text();
					console.error('Failed to create shipping rate:', t);
				}
			} catch (e) {
				console.error('Error creating shipping rate:', e);
			}

			if (dynamicRateId) {
				params.append('shipping_options[0][shipping_rate]', dynamicRateId);
			} else {
				// Fallback: add shipping as a regular line item
				const idx = items.length;
				params.append(`line_items[${idx}][price_data][currency]`, 'usd');
				params.append(`line_items[${idx}][price_data][product_data][name]`, 'Shipping');
				params.append(`line_items[${idx}][price_data][unit_amount]`, String(shippingCents));
				params.append(`line_items[${idx}][quantity]`, '1');
			}
		}

		const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
		params.append('mode', 'payment');
		params.append('success_url', `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
		params.append('cancel_url', `${origin}/checkout/cancel`);

		// Create session via Stripe HTTP API
		const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${stripeSecret}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params.toString(),
		});

		if (!res.ok) {
			const text = await res.text();
			console.error('Stripe create session failed', text);
			return NextResponse.json({ error: 'Stripe error', detail: text }, { status: 500 });
		}

		const data = await res.json();
		return NextResponse.json({ url: data.url });
	} catch (err: any) {
		console.error('Checkout route error', err?.message || err);
		return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
	}
}
