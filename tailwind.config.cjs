/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,tsx}"],
	theme: {
		colors: {
			salmon: "#F87070",
			"baby-blue": "#70F3F8",
			heliotrope: "#D881F8",
			purple: "#D7E0FF",
			"hawkes-blue": "#1E213F",
			white: "#FFFFFF",
			silver: "#EFF1FA",
			"black-russian": "#161932",
		},
		fontFamily: {
			"kumbh-sans": ["Kumbh Sans", "sans-serif"],
			"roboto-slab": ["Roboto Slab", "serif"],
			"space-mono": ["Space Mono", "monospace"],
		},
		extend: {},
	},
	plugins: [],
};
