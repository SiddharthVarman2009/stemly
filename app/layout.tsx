import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from './components/CartProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'STEMLY Engineering Kits',
  description:
    'Hands-on STEM starter kits for children ages 5-12 in underserved communities across Greater Philadelphia.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
        <Script
          src="https://widgets.givebutter.com/latest.umd.cjs?acct=ZiVbjqMl9S3xFCeq&p=other"
          strategy="lazyOnload"
        />
        <Analytics />
      </body>
    </html>
  );
}
