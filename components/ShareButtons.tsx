"use client";

import { useState } from 'react';
import { Check, Copy, Facebook, Share2, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { buildFacebookUrl, buildShareMessage, buildWhatsAppUrl, copyText } from '@/lib/share';
import type { Lantern } from '@/types/lantern';

type Props = {
  lantern: Lantern;
  shareUrl: string;
};

export function ShareButtons({ lantern, shareUrl }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleNativeShare() {
    const message = buildShareMessage(lantern, shareUrl);
    if (navigator.share) {
      await navigator.share({ title: 'Digital Vesak Lantern Area', text: message, url: shareUrl });
      return;
    }

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  }

  const shareMessage = buildShareMessage(lantern, shareUrl);

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={handleNativeShare}>
        <Share2 className="h-4 w-4" />
        Native Share
      </Button>
      <Button asChild variant="outline">
        <a href={buildWhatsAppUrl(shareMessage)} target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" />
          Share on WhatsApp
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={buildFacebookUrl(shareUrl)} target="_blank" rel="noreferrer">
          <Facebook className="h-4 w-4" />
          Share on Facebook
        </a>
      </Button>
      <Button variant="secondary" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied Link' : 'Copy Link'}
      </Button>
    </div>
  );
}