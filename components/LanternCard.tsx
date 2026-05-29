"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { getLanternColorOption, getLanternStyleOption } from '@/data/lanternStyles';
import type { Lantern } from '@/types/lantern';
import { cn } from '@/lib/cn';

type Props = {
  lantern: Lantern;
  variant?: 'preview' | 'gallery' | 'export';
  className?: string;
};

function LanternVisual({ lantern, variant }: Pick<Props, 'lantern' | 'variant'>) {
  const color = getLanternColorOption(lantern.color);
  const style = getLanternStyleOption(lantern.style);
  const sizeClass = variant === 'preview' ? 'h-[21rem] w-[16rem] sm:h-[24rem] sm:w-[18rem]' : variant === 'export' ? 'h-[22rem] w-[17rem]' : 'h-[14rem] w-[11rem]';
  const isExport = variant === 'export';
  const bodyFill = `url(#lantern-gradient-${lantern.id})`;
  const glowFill = `url(#lantern-glow-${lantern.id})`;

  return (
    <div className={cn('relative mx-auto flex items-center justify-center', sizeClass)}>
      <div className={cn('absolute inset-8 rounded-full blur-3xl opacity-75', color.glow)} />
      <svg viewBox="0 0 260 340" className={cn('relative h-full w-full', isExport ? '' : 'drop-shadow-[0_0_35px_rgba(255,215,128,0.25)]')} aria-hidden>
        <defs>
          <linearGradient id={`lantern-gradient-${lantern.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color.primary} />
            <stop offset="50%" stopColor={color.secondary} />
            <stop offset="100%" stopColor={color.tertiary} />
          </linearGradient>
          <radialGradient id={`lantern-glow-${lantern.id}`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={color.primary} />
            <stop offset="55%" stopColor={color.halo} />
            <stop offset="100%" stopColor="rgba(255,186,77,0.03)" />
          </radialGradient>
        </defs>

        {style.value === 'star' ? (
          <g>
            <polygon points="130,28 151,82 208,82 162,116 180,172 130,142 80,172 98,116 52,82 109,82" fill={bodyFill} stroke={color.stroke} strokeWidth="2.2" />
            <polygon points="130,56 145,92 183,92 153,113 165,150 130,127 95,150 107,113 77,92 115,92" fill={glowFill} opacity="0.72" />
            <path d="M130 172c0 16 0 25 0 40" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M118 212c4 6 8 10 12 14" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M142 212c-4 6-8 10-12 14" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          </g>
        ) : style.value === 'lotus' ? (
          <g>
            <path d="M130 42c24 10 44 32 44 59 0 31-20 59-44 86-24-27-44-55-44-86 0-27 20-49 44-59Z" fill={bodyFill} stroke={color.stroke} strokeWidth="2.2" />
            <path d="M130 58c16 8 28 24 28 40 0 22-12 42-28 61-16-19-28-39-28-61 0-16 12-32 28-40Z" fill={glowFill} opacity="0.82" />
            <path d="M130 34c10 14 18 27 18 41 0 18-8 34-18 52-10-18-18-34-18-52 0-14 8-27 18-41Z" fill="rgba(255,255,255,0.22)" />
            <path d="M104 146c10 14 18 21 26 32 8-11 16-18 26-32" fill="none" stroke={color.stroke} strokeWidth="1.8" opacity="0.7" />
            <circle cx="130" cy="127" r="22" fill="rgba(255,255,255,0.28)" />
          </g>
        ) : style.value === 'modern' ? (
          <g>
            <rect x="92" y="42" width="76" height="170" rx="34" fill={bodyFill} stroke={color.stroke} strokeWidth="2.2" />
            <rect x="100" y="60" width="60" height="108" rx="24" fill={glowFill} opacity="0.9" />
            <path d="M108 96h44" stroke={color.stroke} strokeWidth="1.8" opacity="0.5" />
            <path d="M108 118h44" stroke={color.stroke} strokeWidth="1.8" opacity="0.5" />
            <rect x="121" y="18" width="18" height="28" rx="8" fill={color.stroke} />
            <circle cx="130" cy="128" r="38" fill={`url(#lantern-glow-${lantern.id})`} opacity="0.72" />
            <rect x="112" y="188" width="36" height="12" rx="6" fill={color.stroke} opacity="0.7" />
          </g>
        ) : style.value === 'golden' ? (
          <g>
            <path d="M82 66c18-14 42-22 48-22s30 8 48 22v92c0 18-20 28-48 28s-48-10-48-28V66Z" fill={bodyFill} stroke={color.stroke} strokeWidth="2.3" />
            <path d="M90 72c12-8 28-14 40-14s28 6 40 14v76c0 14-16 22-40 22s-40-8-40-22V72Z" fill={glowFill} opacity="0.86" />
            <path d="M94 58c10-6 24-12 36-12s26 6 36 12" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <rect x="117" y="18" width="26" height="30" rx="8" fill={color.stroke} />
            <path d="M98 183h64" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <circle cx="130" cy="134" r="42" fill={`url(#lantern-glow-${lantern.id})`} opacity="0.82" />
          </g>
        ) : (
          <g>
            <path d="M76 84l54-40 54 40v78l-54 34-54-34V84Z" fill={bodyFill} stroke={color.stroke} strokeWidth="2.2" />
            <path d="M94 94l36-26 36 26v56l-36 22-36-22V94Z" fill={glowFill} opacity="0.88" />
            <path d="M90 84h80" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <rect x="118" y="18" width="24" height="28" rx="8" fill={color.stroke} />
            <path d="M100 178h60" stroke={color.stroke} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <circle cx="130" cy="132" r="38" fill={`url(#lantern-glow-${lantern.id})`} opacity="0.8" />
          </g>
        )}

        <g opacity="0.55">
          <path d="M130 190c0 18 0 26 0 36" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          <path d="M118 228c4 6 8 10 12 12" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
          <path d="M142 228c-4 6-8 10-12 12" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 rounded-b-full bg-amber-100/40 blur-xl" />
      {variant === 'preview' ? <div className="absolute bottom-4 left-1/2 h-16 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-100 to-transparent" /> : null}
    </div>
  );
}

export function LanternCard({ lantern, variant = 'gallery', className }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const color = getLanternColorOption(lantern.color);
  const style = getLanternStyleOption(lantern.style);
  const isExport = variant === 'export';

  return (
    <motion.article
      className={cn('relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_120px_rgba(0,0,0,0.38)] backdrop-blur-xl', isExport && 'bg-[#070b18] shadow-none backdrop-blur-0', className)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className={cn('absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,235,183,0.16),transparent_32%),radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_24%)]', isExport && 'bg-[radial-gradient(circle_at_top,rgba(255,232,180,0.14),transparent_30%),linear-gradient(180deg,rgba(6,8,18,1),rgba(10,13,24,1))]')} />
      <div className={cn('absolute inset-0 grid-fade opacity-30', isExport && 'opacity-15')} />
      <div className={cn('absolute inset-x-6 top-6 h-24 rounded-full blur-3xl', color.glow)} />

      <div className={cn('relative flex h-full flex-col', variant === 'preview' ? 'gap-6 p-6 sm:p-8' : isExport ? 'gap-6 p-8' : 'gap-4 p-5')}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{lantern.createdAt}</p>
            <h3 className={cn('mt-2 font-semibold text-white', variant === 'preview' ? 'text-2xl' : 'text-lg')}>{lantern.name}</h3>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className={cn('rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em]', color.ring, 'bg-black/10 text-white/75')}>{style.label}</span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-amber-100/80">{color.label}</span>
          </div>
        </div>

        <motion.div
          className="relative flex w-full justify-center"
          animate={shouldReduceMotion || isExport ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn('h-28 w-28 rounded-full blur-3xl', color.glow)} />
          </div>
          <LanternVisual lantern={lantern} variant={variant} />
          <div className={cn('absolute right-4 top-4 text-amber-100/75', isExport && 'hidden')}>
            <Sparkles className="h-4 w-4 animate-sparkle" />
          </div>
        </motion.div>

        <div className="space-y-3 text-center">
          <p className={cn('mx-auto max-w-[32rem] text-white/80', variant === 'preview' ? 'text-lg leading-8' : 'text-sm leading-6')}>{lantern.wish}</p>
          {variant === 'preview' ? <p className="text-sm uppercase tracking-[0.28em] text-amber-100/80">May the light of kindness shine within you.</p> : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/55">
          <span>Tapro IT Digital Vesak Kalapaya</span>
          <span>{lantern.language === 'sinhala' ? 'Sinhala Wish' : 'English Wish'}</span>
        </div>
      </div>
    </motion.article>
  );
}