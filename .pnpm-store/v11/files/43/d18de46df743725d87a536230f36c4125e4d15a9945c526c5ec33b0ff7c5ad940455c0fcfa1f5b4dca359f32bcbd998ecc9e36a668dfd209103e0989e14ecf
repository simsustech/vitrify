import { parseVariantGroup } from "@unocss/core";
//#region src/index.ts
function transformerVariantGroup(options = {}) {
	const separators = options.separators || [":", "-"];
	return {
		name: "@unocss/transformer-variant-group",
		enforce: "pre",
		codeFilter: (code) => separators.some((separator) => code.includes(`${separator}(`)),
		transform(s) {
			const result = parseVariantGroup(s, separators);
			return { get highlightAnnotations() {
				return [...result.groupsByOffset.values()].flatMap((group) => group.items);
			} };
		}
	};
}
//#endregion
export { transformerVariantGroup as default };
