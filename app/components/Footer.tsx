import Link from 'next/link';
import { Mail, MapPin, Share2, Globe, Send } from 'lucide-react';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Kit', href: '/kit' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact Us', href: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Share2 },
  { label: 'Facebook', href: '#', icon: Globe },
  { label: 'LinkedIn', href: '#', icon: Share2 },
  { label: 'X (Twitter)', href: '#', icon: Send },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="STEMLY Engineering Kits"
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
            <p className="text-sm text-slate-400 leading-relaxed">
              Making STEM accessible for every child.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Find Us
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Reach Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:contact@stemly.org" className="hover:text-white transition-colors">
                  contact@stemly.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>West Chester, PA 19382</span>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors underline underline-offset-2">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} STEMLY Engineering Kits. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
