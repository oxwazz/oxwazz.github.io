import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import remarkUnwrapImages from "remark-unwrap-images";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import { transformerTwoslash, rendererRich } from "@shikijs/twoslash";
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";

export default defineConfig({
	// ! Please remember to replace the following site property with your own domain
	site: "https://oxwazz.com/",
	markdown: {
		syntaxHighlight: "shiki",
		// @ts-expect-error
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		remarkRehype: { footnoteLabelProperties: { className: [""] } },
		shikiConfig: {
			themes: {
				light: "vitesse-light",
				dark: "vitesse-dark",
			},
			transformers: [
				// @ts-expect-error
				transformerTwoslash({
					renderer: rendererRich(),
				}),
				transformerNotationDiff(),
				transformerNotationHighlight(),
			],
		},
	},
	integrations: [
		mdx(),
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
		// @ts-expect-error
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
