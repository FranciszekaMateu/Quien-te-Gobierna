/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['var(--font-playfair)'],
        'source-serif': ['var(--font-source-serif)'],
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-100%) rotate(-45deg)' },
          '100%': { transform: 'translateX(100%) rotate(-45deg)' }
        },
        'slide-reverse': {
          '0%': { transform: 'translateX(100%) rotate(45deg)' },
          '100%': { transform: 'translateX(-100%) rotate(45deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide': 'slide 3s linear infinite',
        'slide-reverse': 'slide-reverse 3s linear infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-delayed': 'fade-in 1s ease-out 0.5s forwards',
      }
    },
  },
  plugins: [],
}

export default config;
