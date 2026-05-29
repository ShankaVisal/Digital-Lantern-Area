import type { Metadata } from 'next';
import { Noto_Sans_Sinhala, Sora } from 'next/font/google';

import '@/app/globals.css';
import { BackgroundMusic } from '@/components/BackgroundMusic';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display'
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala', 'latin'],
  variable: '--font-sinhala'
});

export const metadata: Metadata = {
  title: 'Tapro IT Digital Vesak Lantern Area',
  description: 'Light a lantern. Share peace. Spread kindness. A peaceful digital Vesak experience by Tapro IT.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${notoSinhala.variable} bg-vesak-midnight text-white antialiased`}>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}