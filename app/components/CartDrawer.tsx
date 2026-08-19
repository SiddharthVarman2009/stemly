'use client';

import { ShoppingCart, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from './CartProvider';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, totalItems, totalPrice } = useCart();
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK ?? '#';

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
            {totalItems > 0 && (
              <Badge className="bg-stemly-orange text-white">{totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 px-4">
          {items.length === 0 ? (
            <p className="text-center text-zinc-500 mt-8">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b pb-4"
                >
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-zinc-500">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 px-4 space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={async () => {
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items }),
                  });
                  const data = await res.json();
                  if (data?.url) {
                    window.location.href = data.url;
                  } else {
                    console.error('Checkout error', data);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="flex w-full items-center justify-center rounded-lg h-10 px-2.5 text-sm font-medium bg-stemly-blue text-white hover:bg-stemly-blue/90 transition-colors"
            >
              Proceed to Checkout
            </button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
