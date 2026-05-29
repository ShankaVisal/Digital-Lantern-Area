import { LampCeiling, Flower2, Sparkles } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function LanternMeaning() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,236,180,0.08),transparent_28%),linear-gradient(180deg,rgba(10,14,28,0.9),rgba(7,9,19,0.95))] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.32)] sm:p-8">
      <div className="absolute inset-0 grid-fade opacity-20" />
      <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-100/80">The Meaning of Vesak Lanterns</p>
          <h2 className="text-2xl font-semibold text-white">Lanterns symbolize wisdom, compassion, and inner peace.</h2>
          <p className="text-sm leading-7 text-white/65">Vesak lanterns symbolize the light of wisdom, compassion, and inner peace. Through this digital lantern area, Tapro IT brings that traditional meaning into the modern digital world, allowing everyone to share blessings and positive thoughts online.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-3 p-5">
              <Flower2 className="h-5 w-5 text-pink-200" />
              <h3 className="text-sm font-semibold text-white">Lotus serenity</h3>
              <p className="text-sm leading-6 text-white/60">The lotus reminds us to rise with grace and purity.</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-3 p-5">
              <LampCeiling className="h-5 w-5 text-amber-200" />
              <h3 className="text-sm font-semibold text-white">Lantern light</h3>
              <p className="text-sm leading-6 text-white/60">A lantern reflects the path of wisdom and kindness.</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-3 p-5">
              <Sparkles className="h-5 w-5 text-amber-200" />
              <h3 className="text-sm font-semibold text-white">Shared peace</h3>
              <p className="text-sm leading-6 text-white/60">Every wish contributes to a kinder digital Vesak celebration.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}