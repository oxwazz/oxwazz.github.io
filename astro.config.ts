import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import remarkUnwrapImages from "remark-unwrap-images";
// @ts-ignore:next-line
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import shikiTwoslash from "remark-shiki-twoslash";

// https://astro.build/config
export default defineConfig({
	// ! Please remember to replace the following site property with your own domain
	site: "https://oxwazz.com/",
	// site: "https://astro-theme-cactus.netlify.app/",
	markdown: {
		remarkPlugins: [
			remarkUnwrapImages,
			remarkReadingTime,
			// shikiTwoslash.default,
			[shikiTwoslash.default, { themes: ["dark-plus", "light-plus"] }],
			//
		],
		// remarkRehype: { footnoteLabelProperties: { className: [""] } },
		// shikiConfig: {
		// 	// theme: "dark-plus",
		// 	transformers: [transformerTwoslash()],
		// },
	},
	integrations: [
		mdx({
			// remarkPlugins: [
			// 	shikiTwoslash.default,
			// [shikiTwoslash.default, { theme: "dark-plus" }]
			//
			// ], // use twoslash in .mdx
			// shikiConfig: {
			// 	// theme: "dracula",
			// 	// wrap: false,
			// 	transformers: [transformerTwoslash()],
			// },
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		prefetch(),
	],
	vite: {
		plugins: [rawFonts([".ttf"])],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});

function rawFonts(ext: Array<string>) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-ignore:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
