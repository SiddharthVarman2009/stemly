'use client';

import { useState } from 'react';
import { Minus, Plus, Share2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '../components/CartProvider';
import { toast } from 'sonner';

const KIT_ID = 'foundational-3in1-kit';
const KIT_NAME = 'Foundational 3-in-1 Engineering Kit';
const KIT_PRICE = 15.0;

const projects = [
  {
    title: 'Balloon-Powered Car',
    description:
      'Discover the magic of physics by using simple balloon power to launch your own car!',
    img: '/Project%201.jpg',
  },
  {
    title: 'Basketball Catapult',
    description:
      'Master the power of levers and energy to launch perfect shots and score big like a real engineer!',
    img: '/Project%202.jpg',
  },
  {
    title: 'Alka-Seltzer Rocket',
    description:
      'Explode into science by mixing bubbles and pressure to launch your own mini-rocket high into the air!',
    img: '/Project%203.jpg',
  },
];

const thumbnails = [
  '/Main%20Promotional%20Kit%20Image.jpg',
  '/AI%20Image%20of%20Packaged%20Kit.jpg',
];

export default function KitPage() {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState<string>(thumbnails[0]);
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK ?? '#';
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  function handleAddToCart() {
    addItem({ id: KIT_ID, name: KIT_NAME, price: KIT_PRICE }, quantity);
    toast.success(`${quantity} kit${quantity > 1 ? 's' : ''} added to cart!`);
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Could not copy link.');
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Kit detail: split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: image gallery */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImg}
              alt="Kit main view"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex gap-3">
            {thumbnails.map((src) => (
              <button
                key={src}
                onClick={() => setActiveImg(src)}
                className={`rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImg === src ? 'border-stemly-teal' : 'border-transparent'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="thumbnail" className="w-28 h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: product info */}
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{KIT_NAME}</h1>
            <p className="text-2xl font-semibold text-stemly-blue">
              ${KIT_PRICE.toFixed(2)} USD
            </p>
            <p className="text-sm text-zinc-500 mt-1">Ages 5-12</p>
          </div>

          <p className="text-zinc-600 leading-relaxed">
            The kit introduces three hands-on, exciting STEM projects: a Basketball Catapult, a
            Balloon-Powered Car, and an Alka-Seltzer Rocket. Each kit comes with the necessary
            materials, illustrated instruction booklets, and reflection activities that encourage
            hands-on exploration and experimentation.
          </p>

          <p className="text-sm text-zinc-600">
            All profits made from a purchase directly support our mission of providing kits to
            children in underserved communities.
          </p>

          <p className="text-sm text-amber-600 font-medium">
            Quick Note: Younger students may require assistance from an adult with the projects.
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Quantity</span>
            <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-semibold min-w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={async () => {
                setLoadingCheckout(true);
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: [{ id: KIT_ID, name: KIT_NAME, price: KIT_PRICE, quantity }] }),
                  });
                  const data = await res.json();
                  if (data?.url) {
                    window.location.href = data.url;
                  } else {
                    console.error('Checkout error', data);
                  }
                } catch (err) {
                  console.error(err);
                } finally {
                  setLoadingCheckout(false);
                }
              }}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-stemly-teal hover:bg-stemly-teal/90 text-white px-6 py-3 font-semibold transition-colors text-sm"
            >
              {loadingCheckout ? 'Redirecting…' : 'Buy Now'}
            </button>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 border-stemly-teal text-stemly-teal hover:bg-stemly-teal/10 rounded-full font-semibold py-3"
            >
              Add to Cart
            </Button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Included Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Included Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="border border-zinc-200 shadow-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-base">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Need Help */}
      <section className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-stemly-teal shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Need Help?</h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              If you have any questions or if certain materials are lost or damaged, our team is
              here to help. Simply email us at{' '}
              <a
                href="mailto:support@stemly.org"
                className="text-stemly-blue hover:underline font-medium"
              >
                support@stemly.org
              </a>
              , and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
