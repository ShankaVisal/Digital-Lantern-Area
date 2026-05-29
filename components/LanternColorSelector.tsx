import { lanternColorOptions, getLanternColorOption } from '@/data/lanternStyles';
import type { LanternColor } from '@/types/lantern';
import { cn } from '@/lib/cn';

type Props = {
  value: LanternColor;
  onChange: (color: LanternColor) => void;
};

export function LanternColorSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 xl:grid-cols-3">
      {lanternColorOptions.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-label={option.label}
            className={cn('flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all duration-300', active ? 'border-amber-200/40 bg-white/10 shadow-glow' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8')}
          >
            <span className={cn('h-9 w-9 rounded-full border bg-gradient-to-b', option.accent, option.ring, option.glow)} />
            <span className="text-xs text-white/70">{getLanternColorOption(option.value).label}</span>
          </button>
        );
      })}
    </div>
  );
}