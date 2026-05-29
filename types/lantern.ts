export type LanternLanguage = 'sinhala' | 'english';

export type LanternStyle = 'traditional' | 'golden' | 'lotus' | 'star' | 'modern';

export type LanternColor = 'white' | 'gold' | 'orange' | 'pink' | 'blue' | 'purple';

export type Lantern = {
  id: string;
  name: string;
  wish: string;
  language: LanternLanguage;
  style: LanternStyle;
  color: LanternColor;
  createdAt: string;
};

export type LanternDraft = Omit<Lantern, 'id' | 'createdAt'>;