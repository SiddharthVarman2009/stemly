import Link from 'next/link';
import { ArrowRight, Beaker, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const whatWeDo = [
  {
    icon: Beaker,
    color: '#1980d4',
    title: 'Create STEM Kits',
    description:
      'Design and package hands-on 3-in-1 beginner engineering kits for young children, including projects like a Basketball Catapult, Balloon-Powered Car, and Alka-Seltzer Rocket.',
  },
  {
    icon: BookOpen,
    color: '#5c96a6',
    title: 'Educational Workshops',
    description:
      'We organize hands-on workshops where children can build, experiment, and learn fundamental STEM concepts through guided activities and engineering challenges.',
  },
  {
    icon: Users,
    color: '#f4851a',
    title: 'Community Partnerships',
    description:
      'We work with local nonprofits, schools, libraries, community centers, churches, and other organizations across Greater Philadelphia.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-stemly-teal/10" />
          <div className="absolute top-1/2 -right-12 w-64 h-64 rounded-full bg-stemly-blue/10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-stemly-teal mb-4">
              STEMLY Engineering Kits
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Making STEM accessible for every child
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed mb-8">
              STEMLY is a nonprofit that provides hands-on science and engineering starter kits,
              workshops, and mentorship to children ages 5-12 in underserved communities across the
              Greater Philadelphia area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kit"
                className="inline-flex items-center justify-center rounded-full bg-stemly-teal hover:bg-stemly-teal/90 text-white px-6 py-3 font-semibold transition-colors"
              >
                Shop Our Kit <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="https://givebutter.com/STEMLY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-stemly-orange text-stemly-orange hover:bg-stemly-orange/10 px-6 py-3 font-semibold transition-colors"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-zinc-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-stemly-teal mb-2">
            What we do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">
            Three ways we light the spark.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeDo.map((item) => (
              <Card key={item.title} className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact strip */}
      <section className="bg-stemly-teal py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            For every $5 of profit from a kit purchased, a brand new kit goes to a child in need.
          </p>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Join us to make a difference.
          </h2>
          <p className="text-zinc-600 mb-8 max-w-xl mx-auto">
            Support our mission by donating or reaching out to partner with STEMLY.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://givebutter.com/STEMLY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-stemly-orange hover:bg-stemly-orange/90 text-white px-6 py-3 font-semibold transition-colors"
            >
              Make a Donation
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-stemly-teal text-stemly-teal hover:bg-stemly-teal/10 px-6 py-3 font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
