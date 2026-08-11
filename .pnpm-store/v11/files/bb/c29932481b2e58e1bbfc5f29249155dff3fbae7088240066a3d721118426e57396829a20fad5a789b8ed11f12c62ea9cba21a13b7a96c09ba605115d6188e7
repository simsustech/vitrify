import { escapeRegExp, expandVariantGroup } from "@unocss/core";
//#region src/index.ts
function transformerCompileClass(options = {}) {
	const { trigger = /(["'`])\s*:uno-?(?<name>\S+)?:\s([\s\S]*?)\1/g, classPrefix = "uno-", hashFn = hash, keepUnknown = true, alwaysHash = false } = options;
	const compiledClass = /* @__PURE__ */ new Map();
	const regexp = typeof trigger === "string" ? new RegExp(`(["'\`])\\s*${escapeRegExp(trigger)}\\s([\\s\\S]*?)\\1`, "g") : trigger;
	return {
		name: "@unocss/transformer-compile-class",
		enforce: "pre",
		async transform(s, _, { uno, tokens, invalidate }) {
			const matches = Array.from(s.original.matchAll(regexp));
			if (!matches.length) return;
			let hasChanges = false;
			const currentClasses = /* @__PURE__ */ new Map();
			for (const match of matches) {
				let body = (match.length === 4 && match.groups ? expandVariantGroup(match[3].trim()) : expandVariantGroup(match[2].trim())).replace(/\s+/g, " ");
				const start = match.index;
				const replacements = [];
				if (keepUnknown) {
					const result = await Promise.all(body.split(/\s+/).filter(Boolean).map(async (i) => [i, !!await uno.parseToken(i)]));
					const known = result.filter(([, matched]) => matched).map(([i]) => i);
					const unknown = result.filter(([, matched]) => !matched).map(([i]) => i);
					replacements.push(...unknown);
					body = known.join(" ");
				}
				if (body) {
					let hash;
					let explicitName = false;
					if (match.groups && match.groups.name) {
						hash = match.groups.name;
						if (alwaysHash) hash += `-${hashFn(body)}`;
						explicitName = true;
					} else hash = hashFn(body);
					const className = `${classPrefix}${hash}`;
					if (explicitName) {
						const existing = currentClasses.get(className);
						if (existing && existing !== body) throw new Error(`Duplicated compile class name "${className}". One is "${body}" and the other is "${existing}". Please choose different class name or set 'alwaysHash' to 'true'.`);
					}
					currentClasses.set(className, body);
					if (compiledClass.get(className) !== body) {
						compiledClass.set(className, body);
						uno.cache.delete(className);
						uno.blocked.delete(className);
						hasChanges = true;
					}
					replacements.unshift(className);
					const shortcut = [
						className,
						body,
						options.layer ? { layer: options.layer } : void 0
					];
					const shortcutIndex = uno.config.shortcuts.findIndex((i) => i[0] === className);
					if (shortcutIndex >= 0) uno.config.shortcuts.splice(shortcutIndex, 1, shortcut);
					else uno.config.shortcuts.push(shortcut);
					if (tokens) tokens.add(className);
				}
				s.overwrite(start + 1, start + match[0].length - 1, replacements.join(" "));
			}
			if (hasChanges) invalidate();
		}
	};
}
function hash(str) {
	let i;
	let l;
	let hval = 2166136261;
	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return `00000${(hval >>> 0).toString(36)}`.slice(-6);
}
//#endregion
export { transformerCompileClass as default };
