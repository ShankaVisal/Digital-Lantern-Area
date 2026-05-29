import { kv } from '@vercel/kv';

import { sampleLanterns } from '@/data/sampleLanterns';
import type { Lantern, LanternColor, LanternLanguage, LanternStyle } from '@/types/lantern';
import { lanternColorOptions, lanternStyleOptions } from '@/data/lanternStyles';

const STORAGE_KEY = 'digital-vesak-lantern-area:public-lanterns';
const MAX_LANTERNS = 120;

const allowedLanguages = new Set<LanternLanguage>(['english', 'sinhala']);
const allowedStyles = new Set<LanternStyle>(lanternStyleOptions.map((option) => option.value));
const allowedColors = new Set<LanternColor>(lanternColorOptions.map((option) => option.value));

export function hasSharedStorage() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function normalizeLantern(lantern: Lantern): Lantern {
  return {
    ...lantern,
    name: lantern.name.trim().slice(0, 60),
    wish: lantern.wish.trim().slice(0, 220),
    createdAt: lantern.createdAt.trim().slice(0, 40)
  };
}

function isLanternLanguage(value: unknown): value is LanternLanguage {
  return typeof value === 'string' && allowedLanguages.has(value as LanternLanguage);
}

function isLanternStyle(value: unknown): value is LanternStyle {
  return typeof value === 'string' && allowedStyles.has(value as LanternStyle);
}

function isLanternColor(value: unknown): value is LanternColor {
  return typeof value === 'string' && allowedColors.has(value as LanternColor);
}

export function isLanternInput(value: unknown): value is Lantern {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<Lantern>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.wish === 'string' &&
    isLanternLanguage(candidate.language) &&
    isLanternStyle(candidate.style) &&
    isLanternColor(candidate.color) &&
    typeof candidate.createdAt === 'string'
  );
}

export async function getPublicLanterns(): Promise<Lantern[]> {
  if (!hasSharedStorage()) {
    return sampleLanterns;
  }

  try {
    const storedLanterns = (await kv.lrange(STORAGE_KEY, 0, MAX_LANTERNS - 1)) as string[];

    if (!Array.isArray(storedLanterns) || storedLanterns.length === 0) {
      return sampleLanterns;
    }

    const parsedLanterns = storedLanterns
      .map((item) => {
        try {
          const parsed = JSON.parse(item);
          return isLanternInput(parsed) ? normalizeLantern(parsed) : null;
        } catch {
          return null;
        }
      })
      .filter((item): item is Lantern => item !== null);

    return parsedLanterns.length > 0 ? parsedLanterns : sampleLanterns;
  } catch {
    return sampleLanterns;
  }
}

export async function savePublicLantern(lantern: Lantern): Promise<Lantern> {
  const nextLantern = normalizeLantern(lantern);

  if (!hasSharedStorage()) {
    return nextLantern;
  }

  try {
    await kv.lpush(STORAGE_KEY, JSON.stringify(nextLantern));
    await kv.ltrim(STORAGE_KEY, 0, MAX_LANTERNS - 1);
  } catch {
    return nextLantern;
  }

  return nextLantern;
}