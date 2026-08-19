import Link from 'next/link';

export const metadata = {
  title: 'About Us | STEMLY Engineering Kits',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      {/* Section 1: Who Are We */}
      <section className="mb-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-stemly-teal mb-3">
          Our Story
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Who Are We</h1>
        <div className="max-w-3xl space-y-5 text-zinc-600 text-lg leading-relaxed">
          <p>
            Founded by a couple of West Chester, PA high school students, we created STEMLY with
            the belief that every child has questions or ideas and deserves the chance to explore
            them.
          </p>
          <p>
            Today, fewer than half of elementary students in underserved communities have access
            to hands-on experiments. We don&apos;t just want children to learn STEM. We want them
            to experience it.
          </p>
          <p>
            With your support, STEMLY can provide young learners with fundamental yet highly
            powerful interactive engineering opportunities.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-100 mb-20" />

      {/* Section 2: Help Us In Our Journey */}
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-stemly-orange mb-3">
          Get Involved
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
          Help us in our journey
        </h2>
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          We are currently looking for more local organizations and partnerships that can hold
          workshops and distribute our kits for free. If you share our mission in providing
          interactive STEM educational opportunities to more children, we would love for you to
          reach out.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-stemly-teal hover:bg-stemly-teal/90 text-white px-6 py-3 font-semibold transition-colors"
          >
            Contact Us
          </Link>
          <a
            href="mailto:contact@stemly.org"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-6 py-3 font-semibold transition-colors"
          >
            contact@stemly.org
          </a>
        </div>
      </section>
    </div>
  );
}
