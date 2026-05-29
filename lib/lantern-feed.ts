import { Redis } from '@upstash/redis';

import { sampleLanterns } from '@/data/sampleLanterns';
import type { Lantern, LanternColor, LanternLanguage, LanternStyle } from '@/types/lantern';
import { lanternColorOptions, lanternStyleOptions } from '@/data/lanternStyles';

const STORAGE_KEY = 'digital-vesak-lantern-area:public-lanterns';
const MAX_LANTERNS = 120;

let redisClient: Redis | null | undefined;

const allowedLanguages = new Set<LanternLanguage>(['english', 'sinhala']);
const allowedStyles = new Set<LanternStyle>(lanternStyleOptions.map((option) => option.value));
const allowedColors = new Set<LanternColor>(lanternColorOptions.map((option) => option.value));

export function hasSharedStorage() {
  const { url, token } = getStorageConfig();
  return Boolean(url && token);
}

function cleanEnvValue(value: string | undefined) {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return trimmed;
  }

  const hasDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
  const hasSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");

  return hasDoubleQuotes || hasSingleQuotes ? trimmed.slice(1, -1).trim() : trimmed;
}

function getStorageConfig() {
  const url = cleanEnvValue(process.env.KV_REST_API_URL) || cleanEnvValue(process.env.UPSTASH_REDIS_REST_URL);
  const token = cleanEnvValue(process.env.KV_REST_API_TOKEN) || cleanEnvValue(process.env.UPSTASH_REDIS_REST_TOKEN);

  return { url, token };
}

function getRedisClient() {
  if (redisClient !== undefined) {
    return redisClient;
  }

  const { url, token } = getStorageConfig();
  if (!url || !token) {
    redisClient = null;
    return redisClient;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
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
  const redis = getRedisClient();
  if (!redis) {
    return sampleLanterns;
  }

  try {
    const storedLanterns = (await redis.lrange(STORAGE_KEY, 0, MAX_LANTERNS - 1)) as unknown[];

    if (!Array.isArray(storedLanterns) || storedLanterns.length === 0) {
      return [];
    }

    const parsedLanterns = storedLanterns
      .map((item) => {
        if (isLanternInput(item)) {
          return normalizeLantern(item);
        }

        if (typeof item !== 'string') {
          return null;
        }

        try {
          const parsed = JSON.parse(item);
          return isLanternInput(parsed) ? normalizeLantern(parsed) : null;
        } catch {
          return null;
        }
      })
      .filter((item): item is Lantern => item !== null);

    return parsedLanterns;
  } catch {
    return [];
  }
}

export async function savePublicLantern(lantern: Lantern): Promise<Lantern> {
  const nextLantern = normalizeLantern(lantern);

  const redis = getRedisClient();
  if (!redis) {
    return nextLantern;
  }

  try {
    await redis.lpush(STORAGE_KEY, nextLantern);
    await redis.ltrim(STORAGE_KEY, 0, MAX_LANTERNS - 1);
  } catch {
    return nextLantern;
  }

  return nextLantern;
}