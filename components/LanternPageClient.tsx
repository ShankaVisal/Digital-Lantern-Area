"use client";

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { LanternHero } from '@/components/LanternHero';
import { LanternCreator } from '@/components/LanternCreator';
import { LanternPreview } from '@/components/LanternPreview';
import { LanternGallery } from '@/components/LanternGallery';
import { LanternMeaning } from '@/components/LanternMeaning';
import { TaproBranding } from '@/components/TaproBranding';
import { sampleLanterns } from '@/data/sampleLanterns';
import type { Lantern, LanternColor, LanternDraft, LanternLanguage, LanternStyle } from '@/types/lantern';

function createQueryLantern(searchParams: URLSearchParams): Lantern | null {
  const name = searchParams.get('name')?.trim();
  const wish = searchParams.get('wish')?.trim();
  const language = searchParams.get('language') as LanternLanguage | null;
  const style = searchParams.get('style') as LanternStyle | null;
  const color = searchParams.get('color') as LanternColor | null;

  if (!name || !wish || !language || !style || !color) {
    return null;
  }

  return {
    id: 'shared-lantern',
    name,
    wish,
    language,
    style,
    color,
    createdAt: 'Vesak 2026'
  };
}

export function LanternPageClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sharedLantern = useMemo(() => createQueryLantern(new URLSearchParams(searchParams.toString())), [searchParams]);
  const [activeLantern, setActiveLantern] = useState<Lantern | null>(sharedLantern);
  const [lanterns, setLanterns] = useState<Lantern[]>(() => (sharedLantern ? [sharedLantern, ...sampleLanterns] : sampleLanterns));
  const [creatorKey, setCreatorKey] = useState(0);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const initialValues = useMemo<Partial<LanternDraft> | undefined>(() => {
    if (!sharedLantern) {
      return undefined;
    }

    return {
      name: sharedLantern.name,
      wish: sharedLantern.wish,
      language: sharedLantern.language,
      style: sharedLantern.style,
      color: sharedLantern.color
    };
  }, [sharedLantern]);

  function pushSharedUrl(lantern: Lantern | null) {
    if (!lantern) {
      window.history.replaceState({}, '', pathname);
      setShareUrl(window.location.origin + pathname);
      return;
    }

    const params = new URLSearchParams();
    params.set('name', lantern.name);
    params.set('wish', lantern.wish);
    params.set('language', lantern.language);
    params.set('style', lantern.style);
    params.set('color', lantern.color);
    const nextPath = `${pathname}?${params.toString()}`;
    window.history.replaceState({}, '', nextPath);
    setShareUrl(window.location.origin + `${pathname}?${params.toString()}`);
  }

  function handleCreate(lantern: Lantern) {
    setActiveLantern(lantern);
    setLanterns((current) => [lantern, ...current.filter((item) => item.id !== lantern.id)]);
    pushSharedUrl(lantern);
  }

  function handleCreateAnother() {
    setActiveLantern(null);
    setCreatorKey((value) => value + 1);
    window.history.replaceState({}, '', pathname);
    setShareUrl(window.location.origin + pathname);
  }

  return (
    <main className="vesak-shell relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <LanternHero />

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <LanternCreator key={creatorKey} initialValues={initialValues} onCreate={handleCreate} />
            <LanternMeaning />
          </div>

          <div className="space-y-6">
            {activeLantern ? <LanternPreview lantern={activeLantern} shareUrl={shareUrl || pathname} onCreateAnother={handleCreateAnother} /> : <div className="flex min-h-[28rem] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-white/60 shadow-[0_24px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl"><div className="max-w-sm space-y-3"><p className="text-lg font-semibold text-white">Your lantern preview will appear here</p><p className="text-sm leading-7 text-white/60">Light a lantern to see the animated preview, then download or share it with friends.</p></div></div>}
          </div>
        </section>

        <LanternGallery lanterns={lanterns} />
        <TaproBranding />
      </div>
    </main>
  );
}