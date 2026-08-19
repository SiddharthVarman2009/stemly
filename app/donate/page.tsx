export const metadata = {
  title: 'Donate | STEMLY Engineering Kits',
};

export default function DonatePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: heading and description */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stemly-orange mb-3">
            Support Our Mission
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Give a Child the Chance to Experience STEM
          </h1>
          <div className="space-y-4 text-zinc-600 text-lg leading-relaxed">
            <p>
              Every $5 donated allows us to create a kit for another child. With your support, we
              can put hands-on STEM opportunities into the hands of more children.
            </p>
          </div>
        </div>

        {/* Right: GiveButter widget */}
        <div className="w-full">
          {/* @ts-expect-error -- custom element registered by GiveButter script */}
          <givebutter-widget id="gmB61b"></givebutter-widget>
          <noscript>
            <a
              href="https://givebutter.com/gmB61b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-stemly-orange text-white font-semibold rounded-full hover:bg-stemly-orange/90 transition-colors"
            >
              Donate on GiveButter
            </a>
          </noscript>
        </div>
      </div>
    </div>
  );
}
