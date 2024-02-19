/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/lib/esm/**/*.js"],
	theme: {
		screens: {
			xs: { min: "300px", max: "504px" },
			...defaultTheme.screens,
		},
		extend: {
			fontFamily: {
				Tajawal: ["Tajawal", "sans-serif"],
			},
			lineHeight: {
				24: "25px",
				36.31: "36.31px",
			},
			colors: {
				"custom-white": "#ffffff",
				"date-color": {
					100: "#CFCFCF",
					200: "#BABABA",
					400: "#414559",
					500: "#3a3e50",
				},
				"chat-body-color": {
					100: "#353535",
					200: "#2a2a2a",
				},
				"chat-user-response": {
					100: "#c4d3d4",
					200: "#3c6e71",
					300: "#1e3738",
				},
				"chat-bubble": {
					100: "#F3F3F3",
					300: "#535D73",
					400: "#222637",
				},
				"theme-switcher-button": "#50577A",
				"chat-system-response": "#284b63",
				"header-color": "#2E3141",
			},
		},
		animations: {
			bounce: "bounce 1s",
		},
	},
	plugins: [
		require("tailgrids/plugin"),
		require("flowbite/plugin"),
		require("flowbite-typography"),
		({ addUtilities, theme, variants }) => {
			const newUtilities = {
				".dark-gradient-text": {
					background: "linear-gradient(330deg, #eee, #98a5ea)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
				},
				".light-gradient-text": {
					background: "linear-gradient(330deg, #2e3141, #6c7078)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
				},
			};

			addUtilities(newUtilities, variants("dark"));
		},
	],
};
