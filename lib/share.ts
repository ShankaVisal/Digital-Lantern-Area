import type { Lantern } from '@/types/lantern';

export function buildShareMessage(lantern: Lantern, pageUrl: string) {
  return `I lit a digital Vesak lantern at Tapro IT Digital Vesak Kalapaya. Light your lantern and share peace this Vesak.\n\nName: ${lantern.name}\nWish: ${lantern.wish}\nLink: ${pageUrl}`;
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildFacebookUrl(pageUrl: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}

export async function copyText(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    throw new Error('Clipboard is not available.');
  }

  await navigator.clipboard.writeText(text);
}