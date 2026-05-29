import { ArrowUpRight, Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function TaproBranding() {
  return (
    <section id="brand" className="grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr] sm:p-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.28em] text-amber-100/80">Created by Tapro IT</p>
        <h2 className="text-2xl font-semibold text-white">Built to celebrate Vesak through technology, creativity, and community.</h2>
        <p className="max-w-2xl text-sm leading-7 text-white/65">Tapro IT created this Digital Vesak Lantern Area to celebrate Vesak through technology, creativity, and meaningful community engagement.</p>
        <Button asChild variant="glow" className="group w-fit">
          <a href="https://www.taproit.com" target="_blank" rel="noreferrer">
            Build your next digital experience with Tapro IT
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Button>
      </div>

      <div className="space-y-4 rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80"><Phone className="h-4 w-4 text-amber-200" /> Phone</div>
          <p className="text-sm text-white/65">077 177 5703</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80"><Mail className="h-4 w-4 text-amber-200" /> Email</div>
          <p className="text-sm text-white/65">info@taproit.com</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80"><ArrowUpRight className="h-4 w-4 text-amber-200" /> Website</div>
          <p className="text-sm text-white/65">www.taproit.com</p>
        </div>
      </div>
    </section>
  );
}