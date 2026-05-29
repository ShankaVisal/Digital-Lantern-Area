"use client";

import { motion, useReducedMotion } from 'framer-motion';

const lanterns = [
  { top: '8%', left: '8%', size: 64, delay: 0 },
  { top: '20%', left: '82%', size: 44, delay: 0.8 },
  { top: '58%', left: '12%', size: 38, delay: 1.2 },
  { top: '72%', left: '78%', size: 58, delay: 0.4 },
  { top: '35%', left: '56%', size: 30, delay: 1.5 }
];

export function FloatingLanterns() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {lanterns.map((lantern, index) => (
        <motion.div
          key={`${lantern.left}-${index}`}
          className="absolute rounded-full"
          style={{ top: lantern.top, left: lantern.left, width: lantern.size, height: lantern.size * 1.28 }}
          initial={{ opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? { opacity: 0.32 } : { opacity: [0.28, 0.6, 0.28], y: [0, -12, 0] }}
          transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, delay: lantern.delay, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 rounded-[999px] bg-gradient-to-b from-amber-100/30 via-amber-300/20 to-transparent blur-xl" />
          <div className="absolute inset-x-2 top-3 bottom-2 rounded-[999px] border border-white/20 bg-gradient-to-b from-white/25 to-amber-200/10 shadow-glow" />
          <div className="absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 rounded-full bg-white/60" />
          <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-b-full bg-amber-200/70 blur-[1px]" />
        </motion.div>
      ))}
    </div>
  );
}