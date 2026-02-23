/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			pixel: ['Press Start 2P', 'monospace'],
		},
	  },
	},
	plugins: [],
  }
