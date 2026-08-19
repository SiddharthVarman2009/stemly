import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from './components/CartProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'STEMLY Engineering Kits',
  description:
    'Hands-on STEM starter kits for children ages 5-12 in underserved communities across Greater Philadelphia.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
