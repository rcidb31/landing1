/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: { 
			sans: ['General Sans', 'sans-serif'],
			title: ['GT America', 'sans-serif'],
			body: ['Neue Haas Grotesk', 'sans-serif'],
		},
	  },
	},
	plugins: [],
  }
  