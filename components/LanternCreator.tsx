"use client";

import { useMemo, useState, type FormEvent } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

import { wishSuggestions } from '@/data/wishSuggestions';
import { lanternColorOptions } from '@/data/lanternStyles';
import type { Lantern, LanternColor, LanternDraft, LanternLanguage, LanternStyle } from '@/types/lantern';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LanternStyleSelector } from '@/components/LanternStyleSelector';
import { LanternColorSelector } from '@/components/LanternColorSelector';

type Props = {
  initialValues?: Partial<LanternDraft>;
  onCreate: (lantern: Lantern) => void;
};

const defaultLanguage: LanternLanguage = 'english';
const defaultStyle: LanternStyle = 'traditional';
const defaultColor: LanternColor = 'gold';

export function LanternCreator({ initialValues, onCreate }: Props) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [wish, setWish] = useState(initialValues?.wish ?? '');
  const [language, setLanguage] = useState<LanternLanguage>(initialValues?.language ?? defaultLanguage);
  const [style, setStyle] = useState<LanternStyle>(initialValues?.style ?? defaultStyle);
  const [color, setColor] = useState<LanternColor>(initialValues?.color ?? defaultColor);
  const [errors, setErrors] = useState<{ name?: string; wish?: string }>({});

  const suggestions = useMemo(() => wishSuggestions[language], [language]);

  function handleSuggestionClick(suggestion: string) {
    setWish(suggestion);
    setErrors((current) => ({ ...current, wish: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { name?: string; wish?: string } = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!wish.trim()) {
      nextErrors.wish = 'Please write a peaceful wish.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const lantern: Lantern = {
      id: globalThis.crypto?.randomUUID?.() ?? `lantern-${Date.now()}`,
      name: name.trim(),
      wish: wish.trim(),
      language,
      style,
      color,
      createdAt: 'Vesak 2026'
    };

    onCreate(lantern);
  }

  return (
    <form id="create" onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-amber-100/80">Lantern Creation</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Light your Vesak lantern</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">Add your name, choose a lantern style and color, and write a wish that can be shared with peace.</p>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/8 p-3 text-white/70 sm:block">
          <Lightbulb className="h-5 w-5 text-amber-200" />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" maxLength={60} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name ? <p id="name-error" className="text-sm text-rose-200">{errors.name}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            value={language}
            onChange={(event) => {
              const nextLanguage = event.target.value as LanternLanguage;
              setLanguage(nextLanguage);
              setWish((current) => current || wishSuggestions[nextLanguage][0]);
            }}
            className="flex h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white outline-none transition focus:border-amber-200/40 focus:bg-white/8 focus:ring-2 focus:ring-amber-200/15"
          >
            <option value="sinhala" className="bg-slate-950">Sinhala</option>
            <option value="english" className="bg-slate-950">English</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wish">Wish message</Label>
        <Textarea id="wish" value={wish} onChange={(event) => setWish(event.target.value)} placeholder="Write your Vesak wish" maxLength={220} aria-invalid={Boolean(errors.wish)} aria-describedby={errors.wish ? 'wish-error' : undefined} />
        <div className="flex items-center justify-between gap-3 text-xs text-white/45">
          <span>{wish.length}/220</span>
          {errors.wish ? <span id="wish-error" className="text-rose-200">{errors.wish}</span> : <span>Choose a suggestion below or write your own wish.</span>}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Label>Wish suggestions</Label>
          <span className="text-xs uppercase tracking-[0.25em] text-white/40">{language}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => handleSuggestionClick(suggestion)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-left text-xs leading-5 text-white/70 transition hover:border-amber-200/30 hover:bg-white/10 hover:text-white">
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <Label>Lantern style</Label>
          <LanternStyleSelector value={style} onChange={setStyle} />
        </div>

        <div className="space-y-3">
          <Label>Lantern color</Label>
          <LanternColorSelector value={color} onChange={setColor} />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
            <div className="flex items-center gap-2 text-white/80">
              <Sparkles className="h-4 w-4 text-amber-200" />
              Lantern styles are tuned for a warm Vesak glow.
            </div>
            <p className="mt-2">Current style: {style}. Current color: {lanternColorOptions.find((option) => option.value === color)?.label ?? color}.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant="glow" className="group">
          Light My Lantern
          <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
        </Button>
        <p className="text-sm text-white/50">Your lantern can be downloaded and shared once it is lit.</p>
      </div>
    </form>
  );
}