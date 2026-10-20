import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CareProvider } from '@/context/CareContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CareDesk 💙 - Remote Elder-Care & Health Tracking',
  description:
    'Zero-friction elder-care dashboard for families. Strict deterministic vitals tracking, traffic-light health status, and bilingual Gemini AI medical report analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-500 selection:text-white bg-slate-50 text-slate-900">
        <CareProvider>{children}</CareProvider>
      </body>
    </html>
  );
}
