export default function CheckoutCancelPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Cancelled</h1>
      <p className="text-zinc-600 mb-6">Looks like you cancelled the checkout. No worries — your cart is still available.</p>
      <div className="flex items-center justify-center gap-4">
        <a href="/kit" className="inline-flex items-center justify-center rounded-full bg-stemly-teal text-white px-6 py-3 font-semibold">Return to Kit</a>
        <a href="/" className="text-sm text-zinc-600 underline">Back to home</a>
      </div>
    </div>
  );
}
