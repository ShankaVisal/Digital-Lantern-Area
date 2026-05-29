import { Suspense } from 'react';
import type { Metadata } from 'next';

import { LanternPageClient } from '@/components/LanternPageClient';

export const metadata: Metadata = {
  title: 'Tapro IT Digital Vesak Lantern Area',
  description: 'Light a lantern. Share peace. Spread kindness. A peaceful digital Vesak experience by Tapro IT.'
};

export const dynamic = 'force-dynamic';

export default function LanternPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vesak-midnight" />}>
      <LanternPageClient />
    </Suspense>
  );
}