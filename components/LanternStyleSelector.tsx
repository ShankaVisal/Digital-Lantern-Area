import { lanternStyleOptions, getLanternStyleOption } from '@/data/lanternStyles';
import type { LanternStyle } from '@/types/lantern';
import { cn } from '@/lib/cn';

type Props = {
  value: LanternStyle;
  onChange: (style: LanternStyle) => void;
};

export function LanternStyleSelector({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      {lanternStyleOptions.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-2xl border p-4 text-left transition-all duration-300',
              active ? 'border-amber-200/40 bg-white/10 shadow-glow' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{option.label}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{option.description}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-100/90">{getLanternStyleOption(option.value).value}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}