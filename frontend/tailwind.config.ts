import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fefbf0',
          100: '#fdf3d7',
          500: '#C9A84C',
          600: '#A07C2A',
          700: '#8A6B20',
          900: '#3D2E0F',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8D48B',
          dark: '#A07C2A',
        },
        juri: {
          bg: '#0A0A0F',
          card: '#13131A',
          'card-hover': '#1A1A24',
          border: '#2A2A35',
          text: '#E8E6E1',
          muted: '#8A8A95',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
export default config;
