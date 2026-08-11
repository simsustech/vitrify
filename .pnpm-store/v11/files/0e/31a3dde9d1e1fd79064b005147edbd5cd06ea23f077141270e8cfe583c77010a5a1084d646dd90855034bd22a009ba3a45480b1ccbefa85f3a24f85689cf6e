import { i as saveOxfmtrcFile, n as exitWithError, r as hasOxfmtrcFile, t as createBlankOxfmtrcFile } from "./shared-BiMl-bLP.js";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
//#region src-js/cli/migration/migrate-prettier.ts
/**
* Run the `--migrate prettier` command to migrate various Prettier's config to `.oxfmtrc.json` file.
* https://prettier.io/docs/configuration
*/
async function runMigratePrettier() {
	const cwd = process.cwd();
	if (await hasOxfmtrcFile(cwd)) return exitWithError("Oxfmt configuration file already exists.");
	const { resolveConfigFile, resolveConfig } = await import("./prettier-BDiqUxNa.js");
	const prettierConfigPath = await resolveConfigFile(join(cwd, "dummy.js"));
	if (!prettierConfigPath) {
		console.log("No Prettier configuration file found.");
		const oxfmtrc = await createBlankOxfmtrcFile(cwd);
		const jsonStr = JSON.stringify(oxfmtrc, null, 2);
		try {
			await saveOxfmtrcFile(cwd, jsonStr);
			console.log("Created `.oxfmtrc.json` instead.");
		} catch {
			exitWithError("Failed to create `.oxfmtrc.json`.");
		}
		return;
	}
	let prettierConfig;
	try {
		prettierConfig = await resolveConfig(prettierConfigPath, { editorconfig: false });
		console.log("Found Prettier configuration at:", prettierConfigPath);
	} catch {
		return exitWithError(`Failed to parse: ${prettierConfigPath}`);
	}
	const oxfmtrc = await createBlankOxfmtrcFile(cwd);
	let hasTailwindcssPlugin = false;
	let hasSortPackageJsonPlugin = false;
	let hasSveltePlugin = false;
	for (const [key, value] of Object.entries(prettierConfig ?? {})) {
		if (key === "plugins" && Array.isArray(value)) {
			for (const plugin of value) if (plugin === "prettier-plugin-tailwindcss") hasTailwindcssPlugin = true;
			else if (plugin === "prettier-plugin-packagejson") hasSortPackageJsonPlugin = true;
			else if (plugin === "prettier-plugin-svelte") hasSveltePlugin = true;
			else if (typeof plugin === "string") console.error(`  - plugins: "${plugin}" is not supported, skipping...`);
			else console.error(`  - plugins: custom plugin module is not supported, skipping...`);
			continue;
		}
		if (key === "parser" || key === "filepath") continue;
		if (key === "requirePragma" || key === "insertPragma") {
			console.error(`  - "${key}" is not supported, skipping...`);
			continue;
		}
		if (key === "endOfLine" && value === "auto") {
			console.error(`  - "endOfLine: auto" is not supported, skipping...`);
			continue;
		}
		if (key === "experimentalTernaries" || key === "experimentalOperatorPosition") {
			console.error(`  - "${key}" is not supported yet`);
			continue;
		}
		if (key.startsWith("tailwind") || key.startsWith("svelte")) continue;
		oxfmtrc[key] = value;
	}
	if (typeof oxfmtrc.printWidth !== "number") {
		console.error(`  - "printWidth" is not set in Prettier config, defaulting to 80 (Oxfmt default: 100)`);
		oxfmtrc.printWidth = 80;
	}
	if (hasSortPackageJsonPlugin) {
		oxfmtrc.sortPackageJson = {};
		console.error(`  - Migrated "prettier-plugin-packagejson" to "sortPackageJson"`);
	} else oxfmtrc.sortPackageJson = false;
	if (hasTailwindcssPlugin) {
		oxfmtrc.sortTailwindcss = migrateMappedOptions(prettierConfig, TAILWIND_OPTION_MAPPING, filterTailwindRegex);
		console.log("Migrated prettier-plugin-tailwindcss options to sortTailwindcss");
	}
	if (hasSveltePlugin) {
		oxfmtrc.svelte = migrateMappedOptions(prettierConfig, SVELTE_OPTION_MAPPING);
		console.log("Migrated prettier-plugin-svelte options to svelte");
	}
	const ignores = await resolvePrettierIgnore(cwd);
	if (ignores.length > 0) console.log("Migrated ignore patterns from `.prettierignore`");
	delete oxfmtrc.ignorePatterns;
	oxfmtrc.ignorePatterns = ignores;
	if (await rawConfigHasOverrides(prettierConfigPath)) console.warn(`  - "overrides" cannot be migrated automatically. See: https://github.com/oxc-project/oxc/issues/18215`);
	const jsonStr = JSON.stringify(oxfmtrc, null, 2);
	try {
		await saveOxfmtrcFile(cwd, jsonStr);
		console.log("Created `.oxfmtrc.json`.");
	} catch {
		return exitWithError("Failed to create `.oxfmtrc.json`.");
	}
}
async function resolvePrettierIgnore(cwd) {
	const ignores = [];
	try {
		const lines = (await readFile(join(cwd, ".prettierignore"), "utf8")).split("\n");
		for (let line of lines) {
			line = line.trim();
			if (line === "" || line.startsWith("#")) continue;
			ignores.push(line);
		}
	} catch {}
	return ignores;
}
async function rawConfigHasOverrides(configPath) {
	try {
		const content = await readFile(configPath, "utf8");
		return /^\s*(?:\[\[\s*overrides\s*\]\]|["']?overrides["']?\s*[:=])/mv.test(content);
	} catch {
		return false;
	}
}
const TAILWIND_OPTION_MAPPING = {
	config: "tailwindConfig",
	stylesheet: "tailwindStylesheet",
	functions: "tailwindFunctions",
	attributes: "tailwindAttributes",
	preserveWhitespace: "tailwindPreserveWhitespace",
	preserveDuplicates: "tailwindPreserveDuplicates"
};
const SVELTE_OPTION_MAPPING = {
	allowShorthand: "svelteAllowShorthand",
	indentScriptAndStyle: "svelteIndentScriptAndStyle",
	sortOrder: "svelteSortOrder"
};
function migrateMappedOptions(prettierConfig, mapping, transform) {
	const result = {};
	for (const [oxfmtKey, prettierKey] of Object.entries(mapping)) {
		const value = prettierConfig[prettierKey];
		if (value === void 0) continue;
		result[oxfmtKey] = transform ? transform(prettierKey, value) : value;
	}
	return result;
}
function filterTailwindRegex(prettierKey, value) {
	if (prettierKey !== "tailwindFunctions" && prettierKey !== "tailwindAttributes" || !Array.isArray(value)) return value;
	return value.filter((item) => {
		if (typeof item !== "string") return false;
		const isRegex = item.startsWith("/") && item.endsWith("/");
		if (isRegex) console.warn(`  - Regexp in "${prettierKey}" option is not supported, skipping: ${item}`);
		return !isRegex;
	});
}
//#endregion
export { runMigratePrettier };
