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
  const [lanterns, setLanterns] = useState<Lantern[]>(() => (sharedLantern ? [sharedLantern] : []));
  const [feedSource, setFeedSource] = useState<'sample' | 'shared'>('sample');
  const [creatorKey, setCreatorKey] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const [shouldScrollToPreview, setShouldScrollToPreview] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!shouldScrollToPreview || !activeLantern) {
      return;
    }

    const timer = window.setTimeout(() => {
      const preview = document.getElementById('preview');
      preview?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);

    setShouldScrollToPreview(false);

    return () => window.clearTimeout(timer);
  }, [activeLantern, shouldScrollToPreview]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLanterns() {
      try {
        const response = await fetch('/api/lanterns', {
          signal: controller.signal,
          cache: 'no-store'
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { lanterns?: Lantern[]; source?: 'sample' | 'shared' };
        const nextLanterns = Array.isArray(data.lanterns) ? data.lanterns : sampleLanterns;

        setFeedSource(data.source ?? 'sample');
        setLanterns(sharedLantern ? [sharedLantern, ...nextLanterns.filter((item) => item.id !== sharedLantern.id)] : nextLanterns);
      } catch {
        if (!controller.signal.aborted) {
          setFeedSource('sample');
          setLanterns(sharedLantern ? [sharedLantern, ...sampleLanterns] : sampleLanterns);
        }
      }
    }

    void loadLanterns();

    return () => controller.abort();
  }, [sharedLantern]);

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

  async function handleCreate(lantern: Lantern) {
    setActiveLantern(lantern);
    setShouldScrollToPreview(true);
    setLanterns((current) => [lantern, ...current.filter((item) => item.id !== lantern.id)]);
    pushSharedUrl(lantern);

    try {
      const response = await fetch('/api/lanterns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lantern)
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { lantern?: Lantern };
      if (data.lantern) {
        setLanterns((current) => [data.lantern as Lantern, ...current.filter((item) => item.id !== data.lantern?.id)]);
      }

      const refreshed = await fetch('/api/lanterns', { cache: 'no-store' });
      if (!refreshed.ok) {
        return;
      }

      const refreshedData = (await refreshed.json()) as { lanterns?: Lantern[]; source?: 'sample' | 'shared' };
      if (Array.isArray(refreshedData.lanterns)) {
        setFeedSource(refreshedData.source ?? 'sample');
        setLanterns(refreshedData.lanterns);
      }
    } catch {
      setFeedSource('sample');
    }
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

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <LanternCreator key={creatorKey} initialValues={initialValues} onCreate={handleCreate} />
            <LanternMeaning />
          </div>

          <div className="space-y-6">
            {activeLantern ? <LanternPreview lantern={activeLantern} shareUrl={shareUrl || pathname} onCreateAnother={handleCreateAnother} /> : <div className="flex min-h-[28rem] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-white/60 shadow-[0_24px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl"><div className="max-w-sm space-y-3"><p className="text-lg font-semibold text-white">Your lantern preview will appear here</p><p className="text-sm leading-7 text-white/60">Light a lantern to see the animated preview, then download or share it with friends.</p></div></div>}
          </div>
        </section>

        <LanternGallery lanterns={lanterns} feedSource={feedSource} />
        <TaproBranding />
      </div>
    </main>
  );
}