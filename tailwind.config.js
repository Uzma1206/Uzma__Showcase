/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cinema: ['"Playfair Display"', 'serif'],
      },
      colors: {
        ink: '#08080b',
        coal: '#0d0d12',
        ember: '#e50914',
        rose: '#ff2e4d',
        bone: '#f5f1ea',
        smoke: 'rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(229,9,20,0.18), transparent 60%)',
        'cinema-grad':
          'linear-gradient(180deg, rgba(8,8,11,0) 0%, rgba(8,8,11,0.7) 60%, #08080b 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 30px rgba(229,9,20,0.15)' },
          '50%': { boxShadow: '0 0 60px rgba(229,9,20,0.4)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
