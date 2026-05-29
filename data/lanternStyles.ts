import type { LanternColor, LanternStyle } from '@/types/lantern';

export type LanternStyleOption = {
  value: LanternStyle;
  label: string;
  description: string;
};

export type LanternColorOption = {
  value: LanternColor;
  label: string;
  accent: string;
  glow: string;
  ring: string;
  primary: string;
  secondary: string;
  tertiary: string;
  stroke: string;
  halo: string;
};

export const lanternStyleOptions: LanternStyleOption[] = [
  { value: 'traditional', label: 'Traditional White Lantern', description: 'A serene paper lantern with a warm, classic Vesak glow.' },
  { value: 'golden', label: 'Golden Vesak Lantern', description: 'An ornate festival lantern with rich gold light.' },
  { value: 'lotus', label: 'Lotus Lantern', description: 'A soft lotus-inspired lantern with peaceful petals.' },
  { value: 'star', label: 'Star Lantern', description: 'A festive star-shaped lantern with a hopeful shine.' },
  { value: 'modern', label: 'Modern Digital Lantern', description: 'A clean glowing lantern for a contemporary digital feel.' }
];

export const lanternColorOptions: LanternColorOption[] = [
  { value: 'white', label: 'White', accent: 'from-white via-slate-100 to-amber-100', glow: 'shadow-[0_0_40px_rgba(255,255,255,0.35)]', ring: 'border-white/25', primary: '#fbfbfb', secondary: '#f3ede0', tertiary: '#dcc9a2', stroke: '#f8f8f8', halo: 'rgba(255,255,255,0.42)' },
  { value: 'gold', label: 'Gold', accent: 'from-amber-200 via-amber-400 to-orange-300', glow: 'shadow-[0_0_45px_rgba(255,184,77,0.45)]', ring: 'border-amber-200/30', primary: '#ffd76f', secondary: '#ffb940', tertiary: '#f58e24', stroke: '#fff0c2', halo: 'rgba(255,201,92,0.48)' },
  { value: 'orange', label: 'Orange', accent: 'from-orange-200 via-orange-400 to-amber-300', glow: 'shadow-[0_0_45px_rgba(255,147,46,0.45)]', ring: 'border-orange-200/30', primary: '#ffbe72', secondary: '#ff8f38', tertiary: '#e95c1f', stroke: '#ffe2bf', halo: 'rgba(255,154,68,0.48)' },
  { value: 'pink', label: 'Pink', accent: 'from-pink-200 via-pink-400 to-rose-300', glow: 'shadow-[0_0_45px_rgba(255,159,216,0.45)]', ring: 'border-pink-200/30', primary: '#ffd0eb', secondary: '#ff91ca', tertiary: '#cf5ea4', stroke: '#fff0fb', halo: 'rgba(255,167,213,0.48)' },
  { value: 'blue', label: 'Blue', accent: 'from-sky-200 via-cyan-400 to-blue-300', glow: 'shadow-[0_0_45px_rgba(103,199,255,0.42)]', ring: 'border-sky-200/30', primary: '#ccecff', secondary: '#63caff', tertiary: '#2977ff', stroke: '#eef9ff', halo: 'rgba(130,203,255,0.42)' },
  { value: 'purple', label: 'Purple', accent: 'from-violet-200 via-fuchsia-400 to-purple-300', glow: 'shadow-[0_0_45px_rgba(179,125,255,0.42)]', ring: 'border-violet-200/30', primary: '#ead0ff', secondary: '#bb86ff', tertiary: '#7f4fe6', stroke: '#f8efff', halo: 'rgba(188,144,255,0.42)' }
];

export function getLanternColorOption(color: LanternColor) {
  return lanternColorOptions.find((option) => option.value === color) ?? lanternColorOptions[0];
}

export function getLanternStyleOption(style: LanternStyle) {
  return lanternStyleOptions.find((option) => option.value === style) ?? lanternStyleOptions[0];
}