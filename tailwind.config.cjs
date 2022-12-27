/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"primary-gradient": "linear-gradient(315deg, #2E325A 0%, #0E112A 100%)",
			},
			boxShadow: {
				"primary-shadow": "-50px -50px 100px #272C5A, 50px 50px 100px #121530",
			},
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
			fontSize: {
				h1: ["6.25rem", { lineHeight: "7.5rem", letterSpacing: "-0.3125rem" }],
				h2: ["1.75rem", { lineHeight: "2.125rem" }],
				h3: ["1rem", { lineHeight: "1.1875rem", letterSpacing: "0.9375rem" }],
				h4: ["0.1875rem", { lineHeight: "1rem", letterSpacing: "0.3125rem" }],
				"body-1": ["0.875rem", { lineHeight: "1.125rem" }],
				"body-2": ["0.75rem", { lineHeight: "0.875rem" }],
			},
			letterSpacing: {
				"description-title": "0.2644rem",
			},
		},
	},
	plugins: [],
};
