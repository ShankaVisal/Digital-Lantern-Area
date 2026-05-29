"use client";

import { motion } from 'framer-motion';

import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedGradientText({ children, className }: Props) {
  return (
    <motion.span
      className={cn(
        'bg-[linear-gradient(110deg,#fff7cf,30%,#ffd477,45%,#fff7cf,60%,#ffc1e8,80%,#fff7cf)] bg-[length:220%_100%] bg-clip-text text-transparent',
        className
      )}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}
