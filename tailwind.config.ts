import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'baloo': ['Baloo Bhaijaan 2']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      slideInDown: 'slideInDown 0.5s ease-out',
      slideInUp: 'slideInDown 0.6s ease-in',
    },
    keyframes: {
      slideInDown: {
        from: {
          transform: 'translateX(-100%)',
        },
        to: {
          transform: 'translateX(0)',
        },
      },
    },
  },
  variants: {
    // Aqui você pode configurar as variantes da animação, se necessário
  },
  plugins: [],
};

export default config;