import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import type { PluginAPI } from "tailwindcss/types/config";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
	darkMode: "class",
	corePlugins: {
		// disable aspect ratio as per docs -> @tailwindcss/aspect-ratio
		aspectRatio: false,
		// disable some core plugins as they are included in the css, even when unused
		touchAction: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		scrollSnapType: false,
		borderOpacity: false,
		textOpacity: false,
		fontVariantNumeric: false,
	},
	theme: {
		extend: {
			colors: {
				bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
				textColor: "hsl(var(--theme-text) / <alpha-value>)",
				link: "hsl(var(--theme-link) / <alpha-value>)",
				accent: "hsl(var(--theme-accent) / <alpha-value>)",
				"accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
				quote: "hsl(var(--theme-text) / <alpha-value>)",
				"accent-3": "hsl(var(--theme-accent-3) / <alpha-value>)",
				"bg-code": "hsl(var(--theme-bg-code) / <alpha-value>)",
			},
			fontFamily: {
				// Add any custom fonts here
				sans: ["Inter", ...fontFamily.sans],
				serif: [...fontFamily.serif],
				code: ["JetBrains Mono", ...fontFamily.mono],
			},
			transitionProperty: {
				height: "height",
			},
			typography: (theme: PluginAPI["theme"]) => ({
				cactus: {
					css: {
						"--tw-prose-body": theme("colors.textColor / 1"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-links": theme("colors.textColor / 1"),
						"--tw-prose-bold": theme("colors.textColor / 1"),
						"--tw-prose-bullets": theme("colors.textColor / 1"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
						"--tw-prose-code": theme("colors.textColor / 1"),
						"--tw-prose-hr": theme("colors.textColor / 1"),
						"--tw-prose-th-borders": "#666",
					},
				},
				DEFAULT: {
					css: {
						"a:not(.no-cactus-link)": {
							"@apply cactus-link": "",
						},
						strong: {
							"@apply text-link font-bold": "",
						},
						code: {
							fontFamily: theme("fontFamily.code"),
							backgroundColor: theme("colors.bg-code / 1"),
							borderRadius: "3px",
							border: "1px solid",
							borderColor: theme("colors.textColor / 0.1"),
							padding: "4px",
							"&::before": {
								content: "none !important",
							},
							"&::after": {
								content: "none !important",
							},
						},
						hr: {
							opacity: "0.3",
							borderTopStyle: "solid",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							fontWeight: "700",
							borderBottom: "1px dashed #666",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						sup: {
							"@apply ms-0.5": "",
							a: {
								"@apply bg-none transition-all": "",
								"&:hover": {
									"@apply text-link no-underline bg-none": "",
								},
								"&:before": {
									content: "'['",
								},
								"&:after": {
									content: "']'",
								},
							},
						},
						/** fix checkbox list style */
						'ul > li:has(input[type="checkbox"])': {
							listStyle: "none",
						},
						'ul > li > input[type="checkbox"]:first-child': {
							margin: "0 8px 0 -22px !important",
						},
						'ul > li > input[type="checkbox"]': {
							position: "relative",
							top: "1px",
						},
						"ul ul": {
							margin: "0 !important",
						},
						"ol ol": {
							margin: "0 !important",
						},
						"li ol": {
							margin: "0 !important",
						},
						"ol li": {
							margin: "0 !important",
						},
						"li ul": {
							margin: "0 !important",
						},
						"ul li": {
							margin: "0 !important",
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")?.[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
	plugins: [
		require("@tailwindcss/typography") /** this breaks tailwind suggestions*/,
		require("@tailwindcss/aspect-ratio"),
		plugin(function ({ addComponents }) {
			addComponents({
				".cactus-link": {
					"@apply text-link no-underline transition-all duration-300 border-b border-link/10": {},
					"&:hover": {
						"@apply border-link/100": {},
					},
				},
				".footer-link": {
					"@apply text-textColor/50 no-underline transition-all duration-300 border-b border-textColor/10":
						{},
					"&:hover": {
						"@apply border-textColor/50": {},
					},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-2": {},
				},
			});
		}),
	],
} satisfies Config;
