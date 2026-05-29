"use client";

import { useMemo, useRef, useState } from 'react';
import { Download, RefreshCw, Sparkles } from 'lucide-react';

import type { Lantern } from '@/types/lantern';
import { Button } from '@/components/ui/button';
import { LanternCard } from '@/components/LanternCard';
import { ShareButtons } from '@/components/ShareButtons';
import { downloadElementAsImage } from '@/lib/downloadCard';

type Props = {
  lantern: Lantern;
  shareUrl: string;
  onCreateAnother: () => void;
};

export function LanternPreview({ lantern, shareUrl, onCreateAnother }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const filename = useMemo(() => `vesak-lantern-${lantern.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'tapro-it'}.png`, [lantern.name]);

  async function handleDownload() {
    if (!cardRef.current) {
      return;
    }

    setIsDownloading(true);
    try {
      await downloadElementAsImage(cardRef.current, filename);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <section id="preview" className="space-y-6 rounded-[2rem] border border-amber-200/20 bg-[linear-gradient(180deg,rgba(255,236,180,0.08),rgba(255,255,255,0.04))] p-6 shadow-[0_26px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-amber-100/80">Lantern Preview</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Your lantern is lit</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">A soft animated lantern card is ready to download and share with your friends and family.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-100/80">
          <Sparkles className="h-3.5 w-3.5" />
          Vesak 2026
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <LanternCard lantern={lantern} variant="preview" />
      </div>

      <div ref={cardRef} aria-hidden className="pointer-events-none fixed left-[-10000px] top-0 w-[1200px] overflow-hidden">
        <LanternCard lantern={lantern} variant="export" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleDownload} variant="secondary" disabled={isDownloading}>
          <Download className="h-4 w-4" />
          {isDownloading ? 'Preparing Image...' : 'Download Lantern Card'}
        </Button>
        <Button onClick={onCreateAnother} variant="outline">
          <RefreshCw className="h-4 w-4" />
          Create Another Lantern
        </Button>
      </div>

      <div>
        <ShareButtons lantern={lantern} shareUrl={shareUrl} />
      </div>
    </section>
  );
}