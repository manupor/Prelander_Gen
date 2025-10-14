/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // NetFusion Neon Theme Colors
        'neon-primary': '#02C173',
        'neon-secondary': '#72DC60',
        'neon-accent': '#061B13',
        'dark-surface': '#31373f',
        'darker-surface': '#393d48',
        'text-muted': '#ffffffcc',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(2, 193, 115, 0.3)',
        'neon-lg': '0 0 30px rgba(2, 193, 115, 0.5)',
        'neon-xl': '0 0 40px rgba(2, 193, 115, 0.6)',
      },
      animation: {
        'pulse-neon': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(2, 193, 115, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(2, 193, 115, 0.6)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        }
      },
      backgroundSize: {
        '300%': '300%',
      }
    },
  },
  plugins: [],
}
