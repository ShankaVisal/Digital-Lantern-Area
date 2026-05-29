"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Music2, Pause, Play, Volume1, VolumeX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

const AUDIO_SRC = '/bg.mp3';
const STORAGE_ENABLED_KEY = 'vesak-music-enabled';
const STORAGE_MUTED_KEY = 'vesak-music-muted';
const STORAGE_VOLUME_KEY = 'vesak-music-volume';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.38);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const enabled = window.localStorage.getItem(STORAGE_ENABLED_KEY) !== 'false';
    const muted = window.localStorage.getItem(STORAGE_MUTED_KEY) === 'true';
    const savedVolume = Number.parseFloat(window.localStorage.getItem(STORAGE_VOLUME_KEY) || '0.38');

    setIsEnabled(enabled);
    setIsMuted(muted);
    setVolume(Number.isFinite(savedVolume) ? Math.min(1, Math.max(0, savedVolume)) : 0.38);
  }, []);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = volume;
    window.localStorage.setItem(STORAGE_VOLUME_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.muted = isMuted;
    window.localStorage.setItem(STORAGE_MUTED_KEY, String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_ENABLED_KEY, String(isEnabled));
  }, [isEnabled]);

  useEffect(() => {
    const currentAudio = audioRef.current;

    if (!currentAudio || !isEnabled) {
      if (currentAudio) {
        currentAudio.pause();
      }
      setIsPlaying(false);
      return;
    }

    let cancelled = false;

    async function startAudio(audioElement: HTMLAudioElement) {
      try {
        await audioElement.play();
        if (!cancelled) {
          setIsPlaying(true);
        }
      } catch {
        if (!cancelled) {
          setIsPlaying(false);
        }
      }
    }

    void startAudio(currentAudio);

    const enableOnGesture = () => {
      setHasInteracted(true);
      void startAudio(currentAudio);
    };

    window.addEventListener('pointerdown', enableOnGesture, { once: true });
    window.addEventListener('keydown', enableOnGesture, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', enableOnGesture);
      window.removeEventListener('keydown', enableOnGesture);
    };
  }, [isEnabled, hasInteracted, shouldReduceMotion]);

  const volumeLabel = useMemo(() => {
    if (isMuted || volume === 0) {
      return 'Muted';
    }

    if (volume < 0.3) {
      return 'Soft';
    }

    if (volume < 0.7) {
      return 'Warm';
    }

    return 'Full';
  }, [isMuted, volume]);

  function toggleMusic() {
    setIsEnabled((current) => !current);
    setHasInteracted(true);
  }

  return (
    <motion.div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl',
        isEnabled ? 'text-amber-100' : 'text-white/70'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2">
        <div className={cn('flex h-9 w-9 items-center justify-center rounded-full', isPlaying ? 'bg-amber-200/20 text-amber-200' : 'bg-white/8 text-white/65')}>
          <Music2 className="h-4 w-4" />
        </div>
        <div className="hidden sm:block">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">Background Music</p>
          <p className="text-xs text-white/70">{isEnabled ? (isPlaying ? 'Playing bg.mp3' : 'Ready to play') : 'Music off'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant={isEnabled ? 'glow' : 'secondary'} className="h-9 rounded-full px-3" onClick={toggleMusic}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="hidden sm:inline">{isEnabled ? 'Pause' : 'Play'}</span>
        </Button>

        <button
          type="button"
          onClick={() => setIsMuted((current) => !current)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume1 className="h-4 w-4" />}
        </button>
      </div>

      <label className="hidden items-center gap-2 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{volumeLabel}</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-white/15 accent-amber-300"
          aria-label="Background music volume"
        />
      </label>
    </motion.div>
  );
}
