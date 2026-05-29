import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './types/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vesak: {
          midnight: '#060816',
          navy: '#091225',
          plum: '#1a102d',
          gold: '#f6c85f',
          amber: '#ffb84d',
          pink: '#ff9fd8',
          glow: '#fff3c4'
        }
      },
      boxShadow: {
        glow: '0 0 35px rgba(246, 200, 95, 0.35)',
        glowStrong: '0 0 60px rgba(255, 184, 77, 0.45)'
      },
      backgroundImage: {
        'vesak-radial': 'radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 35%), radial-gradient(circle at 20% 20%, rgba(246,200,95,0.12), transparent 18%), radial-gradient(circle at 80% 0%, rgba(255,159,216,0.12), transparent 16%), linear-gradient(180deg, #070915 0%, #090f1f 45%, #050816 100%)'
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' }
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.72', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' }
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(10px, -18px, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' }
        },
        sparkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.25)' }
        }
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
        sparkle: 'sparkle 2.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;