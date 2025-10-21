import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sunrise: {
          'red': '#FF4D4D',
          'orange': '#FF7E45',
          'yellow': '#FFB547',
          'light': '#FFF1DB'
        },
        sunset: {
          'purple': '#8B5CF6',
          'magenta': '#D946EF',
          'maroon': '#9D174D',
          'deep': '#1E1B4B'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        'typing': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        'blink': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'hsl(var(--primary))' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px rgba(255, 77, 77, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 77, 77, 0.8)' },
          '100%': { boxShadow: '0 0 5px rgba(255, 77, 77, 0.5)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'progress': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-out': 'fade-out 0.6s ease-out',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-left': 'slide-left 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-right': 'slide-right 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spin-slow': 'spin-slow 15s linear infinite',
        'progress': 'progress 2.5s ease-in-out'
      },
      backgroundImage: {
        'gradient-sunrise': 'linear-gradient(135deg, #FF4D4D 0%, #FF7E45 50%, #FFB547 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #9D174D 100%)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      spacing: {
        section: '7rem',
        'section-sm': '5rem',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
