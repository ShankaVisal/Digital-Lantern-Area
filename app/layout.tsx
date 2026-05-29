import type { Metadata } from 'next';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Tapro IT Digital Vesak Lantern Area',
  description: 'Light a lantern. Share peace. Spread kindness. A peaceful digital Vesak experience by Tapro IT.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-vesak-midnight text-white antialiased">
        {children}
      </body>
    </html>
  );
}