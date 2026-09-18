/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: { DEFAULT: 'var(--border)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        wood: {
          dark: 'var(--wood-dark)',
          mid: 'var(--wood-mid)',
          light: 'var(--wood-light)',
        },
        kraft: {
          DEFAULT: 'var(--kraft)',
          dark: 'var(--kraft-dark)',
        },
        cream: { DEFAULT: 'var(--cream)' },
        sticker: { DEFAULT: 'var(--sticker-white)' },
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        display: ['var(--font-fraunces)', 'serif'],
      },
      animation: {
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'wobble': 'wobble 3s ease-in-out infinite',
        'clock-blink': 'clockBlink 1s step-end infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};