import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://savya.example.com'),
  title: {
    default: 'Savya — Handcrafted Luxury Furniture & Bespoke Interiors',
    template: '%s — Savya',
  },
  description:
    'Savya crafts timeless handcrafted furniture and bespoke interiors. Made to order by master artisans in premium, sustainable materials — designed to transform your home into a sanctuary.',
  keywords: [
    'luxury furniture',
    'handcrafted furniture',
    'bespoke furniture',
    'custom sofas',
    'designer interiors',
    'artisan furniture',
    'Savya',
  ],
  openGraph: {
    title: 'Savya — Handcrafted Luxury Furniture & Bespoke Interiors',
    description:
      'Timeless handcrafted furniture, made to order by master artisans. The Design of Life.',
    type: 'website',
    siteName: 'Savya',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
