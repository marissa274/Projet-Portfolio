import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';

const displayFont = localFont({
  src: '../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2',
  variable: '--font-fancy',
  weight: '400 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marissa Bindeki | Portfolio',
  description: 'Marissa Belle Bindeki. Software engineer. The future Mae Jemison. Discover my projects, background and ambitions.',
  icons: { icon: '/images/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={displayFont.variable}><head><link rel="stylesheet" href="/stylesheets/site-ruler.css" /></head><body>{children}<Script src="/scripts/site-ruler.js" strategy="afterInteractive" /></body></html>;
}
