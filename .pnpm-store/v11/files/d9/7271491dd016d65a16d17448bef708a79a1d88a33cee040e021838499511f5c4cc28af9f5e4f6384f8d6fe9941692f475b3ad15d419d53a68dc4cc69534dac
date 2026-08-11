import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
//#region src-js/libs/apis.ts
const CACHES = {
	prettier: null,
	sveltePlugin: null,
	tailwindPlugin: null,
	tailwindSorter: null,
	oxfmtPlugin: null
};
async function loadCached(key, loader) {
	CACHES[key] ??= await loader();
	return CACHES[key];
}
async function loadPrettier() {
	return loadCached("prettier", async () => {
		const prettier = await import("./prettier-BDiqUxNa.js");
		const { formatOptionsHiddenDefaults } = prettier.__internal;
		formatOptionsHiddenDefaults.parentParser = null;
		formatOptionsHiddenDefaults.__onHtmlRoot = null;
		formatOptionsHiddenDefaults.__inJsTemplate = null;
		return prettier;
	});
}
/**
* Format non-js file
*
* @returns Formatted code
*/
async function formatFile({ code, options }) {
	const prettier = CACHES.prettier ?? await loadPrettier();
	if ("_useSveltePlugin" in options) await setupSveltePlugin(options);
	if ("_useTailwindPlugin" in options) await setupTailwindPlugin(options);
	if ("_oxfmtPluginOptionsJson" in options) await setupOxfmtPlugin(options);
	if (options.parser === "vue" && hasTsxScriptBlock(code)) options._oxfmtVueScriptLang = "tsx";
	return prettier.format(code, options);
}
const SCRIPT_OPEN_TAG_RE = /<script(?=[\s>])((?:"[^"]*"|'[^']*'|[^"'>])*)>/gv;
const LANG_TSX_ATTR_RE = /(?:^|\s)lang\s*=\s*(?:"tsx"|'tsx'|tsx(?=[\s\/]|$))/v;
/**
* Whether any `<script ...>` open tag in `sourceText` carries `lang="tsx"`.
*
* A plain-text scan may have a false positive.
* (e.g. the literal tag inside a template string or comment),
* the block parses as `tsx`, worst case the lone generic comma is kept or,
* if the block uses ts-only syntax, it is left unformatted.
* Never destructive, so leniency is acceptable trade-off here.
*/
function hasTsxScriptBlock(sourceText) {
	for (const [, attrs] of sourceText.matchAll(SCRIPT_OPEN_TAG_RE)) if (LANG_TSX_ATTR_RE.test(attrs)) return true;
	return false;
}
/**
* Format non-js code snippets into formatted string.
* Used for formatting code fences within JSDoc.
*
* @returns Formatted code snippet
*/
async function formatEmbeddedCode({ code, options }) {
	const prettier = CACHES.prettier ?? await loadPrettier();
	if ("_useTailwindPlugin" in options) await setupTailwindPlugin(options);
	return prettier.format(code, options);
}
/**
* Format a non-js code snippet into a Prettier `Doc` JSON string.
* This makes our printer correctly handle `printWidth` even for embedded code.
*
* @returns `Doc` JSON string
*/
async function formatEmbeddedDoc({ code, options }) {
	const prettier = CACHES.prettier ?? await loadPrettier();
	if ("_useTailwindPlugin" in options) await setupTailwindPlugin(options);
	const metadata = {};
	if (options.parser === "html" || options.parser === "angular") {
		options.parentParser = "OXFMT";
		options.__onHtmlRoot = (root) => metadata.htmlHasMultipleRootElements = (root.children?.length ?? 0) > 1;
	}
	if (options.parser === "markdown") options.__inJsTemplate = true;
	const doc = await prettier.__debug.printToDoc(code, options);
	const symbolToNumber = /* @__PURE__ */ new Map();
	let nextId = 1;
	return JSON.stringify([doc, metadata], (_key, value) => {
		if (typeof value === "symbol") {
			if (!symbolToNumber.has(value)) symbolToNumber.set(value, nextId++);
			return symbolToNumber.get(value);
		}
		if (value === -Infinity) return "__NEGATIVE_INFINITY__";
		return value;
	});
}
/**
* Load Tailwind CSS plugin.
* Option mapping (sortTailwindcss.xxx → tailwindXxx) is also done in Rust side.
*/
async function setupTailwindPlugin(options) {
	CACHES.tailwindPlugin ??= await loadCached("tailwindPlugin", () => import("./dist-DKt9P4zb.js"));
	options.plugins ??= [];
	options.plugins.push(CACHES.tailwindPlugin);
}
/**
* Process Tailwind CSS classes found in JS/TS files in batch.
* @param args - Object containing classes and options (filepath is in options.filepath)
* @returns Array of sorted class strings (same order/length as input)
*/
async function sortTailwindClasses({ classes, options }) {
	CACHES.tailwindSorter ??= await loadCached("tailwindSorter", () => import("./sorter-CIHA4_SE.js"));
	const { createSorter } = CACHES.tailwindSorter;
	return (await createSorter({
		filepath: options.filepath,
		stylesheetPath: options.tailwindStylesheet,
		configPath: options.tailwindConfig,
		preserveWhitespace: options.tailwindPreserveWhitespace,
		preserveDuplicates: options.tailwindPreserveDuplicates
	})).sortClassAttributes(classes);
}
/**
* Load prettier-plugin-svelte to provide the `svelte` parser.
*/
async function setupSveltePlugin(options) {
	CACHES.sveltePlugin ??= await loadCached("sveltePlugin", async () => await import("./plugin-B-RQ-0j9.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1)));
	options.plugins ??= [];
	options.plugins.push(CACHES.sveltePlugin);
}
/**
* Load oxfmt plugin for js-in-xxx parsers.
*/
async function setupOxfmtPlugin(options) {
	CACHES.oxfmtPlugin ??= await loadCached("oxfmtPlugin", async () => await import("./prettier-plugin-oxfmt-Ck_gsuW0.js"));
	options.plugins ??= [];
	options.plugins.push(CACHES.oxfmtPlugin);
}
//#endregion
export { sortTailwindClasses as i, formatEmbeddedDoc as n, formatFile as r, formatEmbeddedCode as t };
