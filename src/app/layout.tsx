import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CareProvider } from '@/context/CareContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
        <CareProvider>{children}</CareProvider>
      </body>
    </html>
  );
}
