"use client";

import { useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Lantern } from '@/types/lantern';
import { Button } from '@/components/ui/button';
import { LanternCard } from '@/components/LanternCard';

type FilterKey = 'all' | 'sinhala' | 'english' | 'gold' | 'white';

type Props = {
  lanterns: Lantern[];
};

const filters: { value: FilterKey; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'sinhala', label: 'Sinhala Wishes' },
  { value: 'english', label: 'English Wishes' },
  { value: 'gold', label: 'Golden Lanterns' },
  { value: 'white', label: 'White Lanterns' }
];

export function LanternGallery({ lanterns }: Props) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filteredLanterns = useMemo(() => {
    return lanterns.filter((lantern) => {
      if (filter === 'all') return true;
      if (filter === 'sinhala' || filter === 'english') return lantern.language === filter;
      return lantern.color === filter;
    });
  }, [filter, lanterns]);

  return (
    <section id="gallery" className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-amber-100/80">Lanterns of Peace</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">A public gallery of Vesak wishes</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">Each lantern represents a wish for peace, kindness, and compassion.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
          <Filter className="h-3.5 w-3.5 text-amber-200" />
          {filteredLanterns.length} lanterns shown
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((option) => (
          <Button key={option.value} size="sm" variant={filter === option.value ? 'glow' : 'secondary'} onClick={() => setFilter(option.value)}>
            {option.label}
          </Button>
        ))}
      </div>

      <motion.div
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } }
        }}
      >
        {filteredLanterns.map((lantern) => (
          <motion.div key={lantern.id} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <LanternCard lantern={lantern} variant="gallery" />
          </motion.div>
        ))}
      </motion.div>

      {filteredLanterns.length === 0 ? <p className="text-sm text-white/55">No lanterns match this filter yet.</p> : null}
    </section>
  );
}