import { NextResponse } from 'next/server';

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
	try {
		const body = await request.json().catch(() => ({}));

		if (!DEEPSEEK_KEY) {
			return NextResponse.json({ error: 'DeepSeek not configured' }, { status: 501 });
		}

		// Basic proxy to DeepSeek (if you have a real endpoint and key).
		// For now, forward the body to the configured DeepSeek endpoint if present.
		const endpoint = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.ai/v1/chat';

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${DEEPSEEK_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const data = await res.json().catch(() => ({}));
		return NextResponse.json(data, { status: res.ok ? 200 : 502 });
	} catch (err: any) {
		console.error('DeepSeek route error', err?.message || err);
		return NextResponse.json({ error: 'DeepSeek proxy error' }, { status: 500 });
	}
}

export async function GET() {
	return NextResponse.json({ status: 'DeepSeek route active' });
}
