export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params?.session_id ?? null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Thank you for your purchase!</h1>
      <p className="text-zinc-600 mb-4">Your payment was successful. We&apos;ve emailed a receipt to you if an email was provided at checkout.</p>
      {sessionId && <p className="text-sm text-zinc-500 mb-6">Order reference: {sessionId}</p>}
      <div className="flex items-center justify-center gap-4">
        <a href="/" className="inline-flex items-center justify-center rounded-full bg-stemly-teal text-white px-6 py-3 font-semibold">Return Home</a>
        <a href="/kit" className="text-sm text-zinc-600 underline">Shop again</a>
      </div>
    </div>
  );
}
