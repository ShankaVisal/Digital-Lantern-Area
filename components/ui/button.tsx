import * as React from 'react';

import { cn } from '@/lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'default' | 'lg';
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 text-slate-950 shadow-[0_20px_60px_rgba(255,184,77,0.2)] hover:brightness-110',
  secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/10',
  outline: 'border border-white/15 bg-transparent text-white hover:bg-white/10',
  ghost: 'bg-transparent text-white hover:bg-white/8',
  glow: 'bg-gradient-to-r from-amber-400 via-orange-300 to-pink-300 text-slate-950 shadow-glow hover:shadow-glowStrong'
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 rounded-xl px-3 text-sm',
  default: 'h-11 rounded-xl px-5 text-sm',
  lg: 'h-12 rounded-2xl px-6 text-base'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'default', asChild = false, type = 'button', children, ...props },
  ref
) {
  const classes = cn('inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-200/60 focus:ring-offset-0 disabled:pointer-events-none disabled:opacity-50', variantClasses[variant], sizeClasses[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className)
    });
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  );
});