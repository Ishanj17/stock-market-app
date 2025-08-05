/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          }
        },
        fontFamily: {
          'quicksand': ['Quicksand', 'sans-serif'],
          'inter': ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
          'card-hover': '0 8px 25px rgba(0, 0, 0, 0.15)',
        }
      },
    },
    plugins: [],
  }