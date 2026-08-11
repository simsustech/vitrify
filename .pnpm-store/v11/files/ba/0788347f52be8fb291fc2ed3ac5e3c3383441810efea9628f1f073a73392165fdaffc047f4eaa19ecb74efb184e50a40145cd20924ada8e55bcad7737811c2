'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const extractorArbitraryVariants = require('@unocss/extractor-arbitrary-variants');
const core = require('@unocss/core');
require('./shared/preset-mini.7d527935.cjs');
const _default$1 = require('./shared/preset-mini.218f1eb5.cjs');
const colors$1 = require('./shared/preset-mini.d7d4b4ea.cjs');
const colors = require('./shared/preset-mini.bb7dc365.cjs');
const _default = require('./shared/preset-mini.3b69091e.cjs');
const _default$2 = require('./shared/preset-mini.1baba2d5.cjs');
require('./shared/preset-mini.950e178f.cjs');

const preflights = [
  {
    layer: "preflights",
    getCSS(ctx) {
      if (ctx.theme.preflightBase) {
        const css = core.entriesToCss(Object.entries(ctx.theme.preflightBase));
        const roots = core.toArray(ctx.theme.preflightRoot ?? ["*,::before,::after", "::backdrop"]);
        return roots.map((root) => `${root}{${css}}`).join("");
      }
    }
  }
];

function presetMini(options = {}) {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  options.preflight = options.preflight ?? true;
  options.variablePrefix = options.variablePrefix ?? "un-";
  return {
    name: "@unocss/preset-mini",
    theme: _default.theme,
    rules: _default$1.rules,
    variants: _default$2.variants(options),
    options,
    prefix: options.prefix,
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    preflights: options.preflight ? normalizePreflights(preflights, options.variablePrefix) : [],
    extractorDefault: options.arbitraryVariants === false ? void 0 : extractorArbitraryVariants.extractorArbitraryVariants
  };
}
function VarPrefixPostprocessor(prefix) {
  if (prefix !== "un-") {
    return (obj) => {
      obj.entries.forEach((i) => {
        i[0] = i[0].replace(/^--un-/, `--${prefix}`);
        if (typeof i[1] === "string")
          i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
      });
    };
  }
}
function normalizePreflights(preflights3, variablePrefix) {
  if (variablePrefix !== "un-") {
    return preflights3.map((p) => ({
      ...p,
      getCSS: (() => async (ctx) => {
        const css = await p.getCSS(ctx);
        if (css)
          return css.replace(/--un-/g, `--${variablePrefix}`);
      })()
    }));
  }
  return preflights3;
}

exports.parseColor = colors$1.parseColor;
exports.colors = colors.colors;
exports.theme = _default.theme;
exports.VarPrefixPostprocessor = VarPrefixPostprocessor;
exports["default"] = presetMini;
exports.normalizePreflights = normalizePreflights;
exports.preflights = preflights;
exports.presetMini = presetMini;
