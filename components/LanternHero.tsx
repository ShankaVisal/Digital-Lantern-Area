import { ArrowRight, Sparkles, MoonStar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FloatingLanterns } from '@/components/FloatingLanterns';
import { LightParticles } from '@/components/LightParticles';

export function LanternHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,244,204,0.15),transparent_28%),linear-gradient(180deg,rgba(15,20,43,0.9),rgba(6,8,22,0.95))] px-6 py-16 shadow-[0_20px_120px_rgba(0,0,0,0.42)] sm:px-10 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_28%)]" />
      <FloatingLanterns />
      <LightParticles />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/70 backdrop-blur-md">
            <MoonStar className="h-3.5 w-3.5 text-amber-200" />
            Tapro IT Digital Vesak Kalapaya
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-amber-200/80">Digital Vesak Lantern Area</p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white vesak-text-glow sm:text-5xl lg:text-6xl">Light a lantern. Share peace. Spread kindness.</h1>
            <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Celebrate Vesak by lighting a virtual lantern with your name and a meaningful wish. Share your lantern with friends and family as a symbol of peace, kindness, and wisdom.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="glow" className="group">
              <a href="#create">
                Light My Lantern
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#gallery">Explore Lantern Gallery</a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:mx-0">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,231,165,0.14),transparent_42%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/55">
              <span>Festival glow</span>
              <Sparkles className="h-4 w-4 text-amber-200" />
            </div>
            <div className="rounded-[1.6rem] border border-amber-200/20 bg-gradient-to-b from-white/10 to-white/5 p-4">
              <div className="mx-auto flex h-52 max-w-48 items-center justify-center rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(246,200,95,0.35),transparent_62%)]">
                <div className="relative h-40 w-28 rounded-[2rem] border border-amber-100/30 bg-gradient-to-b from-white/70 via-amber-100/85 to-amber-300/70 shadow-glow animate-floatSlow">
                  <div className="absolute left-1/2 top-[-14px] h-6 w-10 -translate-x-1/2 rounded-t-full border border-white/35 bg-gradient-to-b from-white/70 to-amber-100/60" />
                  <div className="absolute inset-x-2 top-4 h-3 rounded-full bg-white/35 blur-sm" />
                  <div className="absolute inset-x-4 top-1/2 h-14 rounded-full bg-white/25 blur-2xl" />
                  <div className="absolute bottom-[-24px] left-1/2 h-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-100 to-transparent" />
                </div>
              </div>
            </div>
            <p className="text-sm leading-6 text-white/65">A soft moonlit Vesak atmosphere with floating lanterns and quiet glow, designed for a peaceful sharing moment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}