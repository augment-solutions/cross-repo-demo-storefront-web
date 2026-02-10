import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { TelemetryProvider } from '@/lib/telemetry/TelemetryProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Ecomm Store - Your One-Stop Shop',
    template: '%s | Ecomm Store',
  },
  description: 'Discover amazing products at great prices. Shop electronics, clothing, home goods, and more.',
  keywords: ['ecommerce', 'online shopping', 'store', 'products', 'deals'],
  authors: [{ name: 'Ecomm Team' }],
  creator: 'Ecomm',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Ecomm Store',
    title: 'Ecomm Store - Your One-Stop Shop',
    description: 'Discover amazing products at great prices.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ecomm Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecomm Store',
    description: 'Discover amazing products at great prices.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TelemetryProvider>
          <Providers>
            {children}
          </Providers>
        </TelemetryProvider>
      </body>
    </html>
  );
}

