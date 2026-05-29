"use client";

import { motion, useReducedMotion } from 'framer-motion';

const particles = [
  { top: '14%', left: '18%', size: 4, delay: 0 },
  { top: '22%', left: '42%', size: 3, delay: 0.4 },
  { top: '16%', left: '69%', size: 5, delay: 0.7 },
  { top: '38%', left: '12%', size: 3, delay: 1.1 },
  { top: '46%', left: '86%', size: 4, delay: 1.4 },
  { top: '66%', left: '24%', size: 5, delay: 1.7 },
  { top: '72%', left: '52%', size: 3, delay: 0.2 },
  { top: '78%', left: '74%', size: 4, delay: 0.9 },
  { top: '30%', left: '58%', size: 3, delay: 1.6 },
  { top: '84%', left: '14%', size: 4, delay: 0.6 }
];

export function LightParticles() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${index}`}
          className="absolute rounded-full bg-amber-100 shadow-[0_0_14px_rgba(255,236,180,0.95)]"
          style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size }}
          animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.2, 1, 0.2], scale: [0.85, 1.15, 0.85] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}