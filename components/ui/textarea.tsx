import * as React from 'react';

import { cn } from '@/lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn('min-h-[132px] w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/45 shadow-sm outline-none transition focus:border-amber-200/40 focus:bg-white/8 focus:ring-2 focus:ring-amber-200/15 disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />;
});