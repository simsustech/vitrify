'use strict';

const colors = require('./preset-mini.d7d4b4ea.cjs');
const core = require('@unocss/core');
const variants$1 = require('./preset-mini.950e178f.cjs');

const variantAria = {
  name: "aria",
  match(matcher, ctx) {
    const variant = variants$1.variantGetParameter("aria-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const aria = colors.handler.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
      if (aria) {
        return {
          matcher: rest,
          selector: (s) => `${s}[aria-${aria}]`
        };
      }
    }
  }
};

function calcMaxWidthBySize(size) {
  const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
  const unit = size.slice(value.length);
  const maxWidth = parseFloat(value) - 0.1;
  return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
}
function variantBreakpoints() {
  const regexCache = {};
  return {
    name: "breakpoints",
    match(matcher, context) {
      const variantEntries = Object.entries(colors.resolveBreakpoints(context) ?? {}).map(([point, size], idx) => [point, size, idx]);
      for (const [point, size, idx] of variantEntries) {
        if (!regexCache[point])
          regexCache[point] = new RegExp(`^((?:([al]t-|[<~]))?${point}(?:${context.generator.config.separators.join("|")}))`);
        const match = matcher.match(regexCache[point]);
        if (!match)
          continue;
        const [, pre] = match;
        const m = matcher.slice(pre.length);
        if (m === "container")
          continue;
        const isLtPrefix = pre.startsWith("lt-") || pre.startsWith("<");
        const isAtPrefix = pre.startsWith("at-") || pre.startsWith("~");
        let order = 1e3;
        if (isLtPrefix) {
          order -= idx + 1;
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (max-width: ${calcMaxWidthBySize(size)})`,
              parentOrder: order
            })
          };
        }
        order += idx + 1;
        if (isAtPrefix && idx < variantEntries.length - 1) {
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
              parentOrder: order
            })
          };
        }
        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size})`,
            parentOrder: order
          })
        };
      }
    },
    multiPass: true,
    autocomplete: "(at-|lt-|)$breakpoints:"
  };
}

function scopeMatcher(name, combinator) {
  return {
    name: `combinator:${name}`,
    match(matcher, ctx) {
      if (!matcher.startsWith(name))
        return;
      const separators = ctx.generator.config.separators;
      let body = variants$1.variantGetBracket(`${name}-`, matcher, separators);
      if (!body) {
        for (const separator of separators) {
          if (matcher.startsWith(`${name}${separator}`)) {
            body = ["", matcher.slice(name.length + separator.length)];
            break;
          }
        }
        if (!body)
          return;
      }
      let bracketValue = colors.handler.bracket(body[0]) ?? "";
      if (bracketValue === "")
        bracketValue = "*";
      return {
        matcher: body[1],
        selector: (s) => `${s}${combinator}${bracketValue}`
      };
    },
    multiPass: true
  };
}
const variantCombinators = [
  scopeMatcher("all", " "),
  scopeMatcher("children", ">"),
  scopeMatcher("next", "+"),
  scopeMatcher("sibling", "+"),
  scopeMatcher("siblings", "~")
];

const variantContainerQuery = {
  name: "@",
  match(matcher, ctx) {
    if (matcher.startsWith("@container"))
      return;
    const variant = variants$1.variantGetParameter("@", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest, label] = variant;
      const unbracket = colors.handler.bracket(match);
      let container;
      if (unbracket) {
        const minWidth = colors.handler.numberWithUnit(unbracket);
        if (minWidth)
          container = `(min-width: ${minWidth})`;
      } else {
        container = ctx.theme.containers?.[match] ?? "";
      }
      if (container) {
        core.warnOnce("The container query variant is experimental and may not follow semver.");
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@container${label ? ` ${label} ` : " "}${container}`
          })
        };
      }
    }
  },
  multiPass: true
};

function variantColorsMediaOrClass(options = {}) {
  if (options?.dark === "class" || typeof options.dark === "object") {
    const { dark = ".dark", light = ".light" } = typeof options.dark === "string" ? {} : options.dark;
    return [
      variants$1.variantMatcher("dark", (input) => ({ prefix: `${dark} $$ ${input.prefix}` })),
      variants$1.variantMatcher("light", (input) => ({ prefix: `${light} $$ ${input.prefix}` }))
    ];
  }
  return [
    variants$1.variantParentMatcher("dark", "@media (prefers-color-scheme: dark)"),
    variants$1.variantParentMatcher("light", "@media (prefers-color-scheme: light)")
  ];
}

const variantDataAttribute = {
  name: "data",
  match(matcher, ctx) {
    const variant = variants$1.variantGetParameter("data-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = colors.handler.bracket(match) ?? ctx.theme.data?.[match] ?? "";
      if (dataAttribute) {
        return {
          matcher: rest,
          selector: (s) => `${s}[data-${dataAttribute}]`
        };
      }
    }
  }
};

const variantLanguageDirections = [
  variants$1.variantMatcher("rtl", (input) => ({ prefix: `[dir="rtl"] $$ ${input.prefix}` })),
  variants$1.variantMatcher("ltr", (input) => ({ prefix: `[dir="ltr"] $$ ${input.prefix}` }))
];

const variantSelector = {
  name: "selector",
  match(matcher, ctx) {
    const variant = variants$1.variantGetBracket("selector-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const selector = colors.handler.bracket(match);
      if (selector) {
        return {
          matcher: rest,
          selector: () => selector
        };
      }
    }
  }
};
const variantCssLayer = {
  name: "layer",
  match(matcher, ctx) {
    const variant = variants$1.variantGetParameter("layer-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const layer = colors.handler.bracket(match) ?? match;
      if (layer) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@layer ${layer}`
          })
        };
      }
    }
  }
};
const variantInternalLayer = {
  name: "uno-layer",
  match(matcher, ctx) {
    const variant = variants$1.variantGetParameter("uno-layer-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const layer = colors.handler.bracket(match) ?? match;
      if (layer) {
        return {
          matcher: rest,
          layer
        };
      }
    }
  }
};
const variantScope = {
  name: "scope",
  match(matcher, ctx) {
    const variant = variants$1.variantGetBracket("scope-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const scope = colors.handler.bracket(match);
      if (scope) {
        return {
          matcher: rest,
          selector: (s) => `${scope} $$ ${s}`
        };
      }
    }
  }
};
const variantVariables = {
  name: "variables",
  match(matcher, ctx) {
    if (!matcher.startsWith("["))
      return;
    const [match, rest] = colors.getBracket(matcher, "[", "]") ?? [];
    if (!(match && rest))
      return;
    let newMatcher;
    for (const separator of ctx.generator.config.separators) {
      if (rest.startsWith(separator)) {
        newMatcher = rest.slice(separator.length);
        break;
      }
    }
    if (newMatcher == null)
      return;
    const variant = colors.handler.bracket(match) ?? "";
    const useParent = variant.startsWith("@");
    if (!(useParent || variant.includes("&")))
      return;
    return {
      matcher: newMatcher,
      handle(input, next) {
        const updates = useParent ? {
          parent: `${input.parent ? `${input.parent} $$ ` : ""}${variant}`
        } : {
          selector: variant.replace(/&/g, input.selector)
        };
        return next({
          ...input,
          ...updates
        });
      }
    };
  },
  multiPass: true
};

const numberRE = /[0-9.]+(?:[a-z]+|%)?/;
const ignoreProps = [
  /opacity|color|flex/
];
function negateFunctions(value) {
  const match = value.match(/^(calc|clamp|max|min)\s*(\(.*)/);
  if (match) {
    const [fnBody, rest] = colors.getComponent(match[2], "(", ")", " ") ?? [];
    if (fnBody)
      return `calc(${match[1]}${fnBody} * -1)${rest ? ` ${rest}` : ""}`;
  }
}
const variantNegative = {
  name: "negative",
  match(matcher) {
    if (!matcher.startsWith("-"))
      return;
    return {
      matcher: matcher.slice(1),
      body: (body) => {
        if (body.find((v) => v[0] === colors.CONTROL_MINI_NO_NEGATIVE))
          return;
        let changed = false;
        body.forEach((v) => {
          const value = v[1]?.toString();
          if (!value || value === "0")
            return;
          if (ignoreProps.some((i) => v[0].match(i)))
            return;
          const negated = negateFunctions(value);
          if (negated) {
            v[1] = negated;
            changed = true;
          } else if (numberRE.test(value)) {
            v[1] = value.replace(numberRE, (i) => `-${i}`);
            changed = true;
          }
        });
        if (changed)
          return body;
        return [];
      }
    };
  }
};

function variantImportant() {
  let re;
  return {
    name: "important",
    match(matcher, ctx) {
      if (!re)
        re = new RegExp(`^(important(?:${ctx.generator.config.separators.join("|")})|!)`);
      let base;
      const match = matcher.match(re);
      if (match)
        base = matcher.slice(match[0].length);
      else if (matcher.endsWith("!"))
        base = matcher.slice(0, -1);
      if (base) {
        return {
          matcher: base,
          body: (body) => {
            body.forEach((v) => {
              if (v[1])
                v[1] += " !important";
            });
            return body;
          }
        };
      }
    }
  };
}

const variantPrint = variants$1.variantParentMatcher("print", "@media print");
const variantCustomMedia = {
  name: "media",
  match(matcher, ctx) {
    const variant = variants$1.variantGetParameter("media-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      let media = colors.handler.bracket(match) ?? "";
      if (media === "")
        media = ctx.theme.media?.[match] ?? "";
      if (media) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media ${media}`
          })
        };
      }
    }
  },
  multiPass: true
};

const variantSupports = {
  name: "supports",
  match(matcher, ctx) {
    const variant = variants$1.variantGetParameter("supports-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      let supports = colors.handler.bracket(match) ?? "";
      if (supports === "")
        supports = ctx.theme.supports?.[match] ?? "";
      if (supports) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@supports ${supports}`
          })
        };
      }
    }
  },
  multiPass: true
};

const PseudoClasses = Object.fromEntries([
  ["first-letter", "::first-letter"],
  ["first-line", "::first-line"],
  "any-link",
  "link",
  "visited",
  "target",
  ["open", "[open]"],
  "hover",
  "active",
  "focus-visible",
  "focus-within",
  "focus",
  "autofill",
  "enabled",
  "disabled",
  "read-only",
  "read-write",
  "placeholder-shown",
  "default",
  "checked",
  "indeterminate",
  "valid",
  "invalid",
  "in-range",
  "out-of-range",
  "required",
  "optional",
  "root",
  "empty",
  ["even-of-type", ":nth-of-type(even)"],
  ["even", ":nth-child(even)"],
  ["odd-of-type", ":nth-of-type(odd)"],
  ["odd", ":nth-child(odd)"],
  "first-of-type",
  ["first", ":first-child"],
  "last-of-type",
  ["last", ":last-child"],
  "only-child",
  "only-of-type",
  ["backdrop-element", "::backdrop"],
  ["placeholder", "::placeholder"],
  ["before", "::before"],
  ["after", "::after"],
  ["selection", "::selection"],
  ["marker", "::marker"],
  ["file", "::file-selector-button"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
const PseudoClassesColon = Object.fromEntries([
  ["backdrop", "::backdrop"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
const PseudoClassFunctions = [
  "not",
  "is",
  "where",
  "has"
];
const PseudoClassesStr = Object.entries(PseudoClasses).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).join("|");
const PseudoClassesColonStr = Object.entries(PseudoClassesColon).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).join("|");
const PseudoClassFunctionsStr = PseudoClassFunctions.join("|");
function pseudoModifier(pseudo) {
  if (pseudo === "focus") {
    return {
      sort: 10,
      noMerge: true
    };
  }
  if (pseudo === "active") {
    return {
      sort: 20,
      noMerge: true
    };
  }
}
function taggedPseudoClassMatcher(tag, parent, combinator) {
  const rawRE = new RegExp(`^(${core.escapeRegExp(parent)}:)(\\S+)${core.escapeRegExp(combinator)}\\1`);
  let splitRE;
  let pseudoRE;
  let pseudoColonRE;
  const matchBracket = (input) => {
    const body = variants$1.variantGetBracket(`${tag}-`, input, []);
    if (!body)
      return;
    const [match, rest] = body;
    const bracketValue = colors.handler.bracket(match);
    if (bracketValue == null)
      return;
    const label = rest.split(splitRE, 1)?.[0] ?? "";
    const prefix = `${parent}${core.escapeSelector(label)}`;
    return [
      label,
      input.slice(input.length - (rest.length - label.length - 1)),
      bracketValue.includes("&") ? bracketValue.replace(/&/g, prefix) : `${prefix}${bracketValue}`
    ];
  };
  const matchPseudo = (input) => {
    const match = input.match(pseudoRE) || input.match(pseudoColonRE);
    if (!match)
      return;
    const [original, fn, pseudoKey] = match;
    const label = match[3] ?? "";
    let pseudo = PseudoClasses[pseudoKey] || PseudoClassesColon[pseudoKey] || `:${pseudoKey}`;
    if (fn)
      pseudo = `:${fn}(${pseudo})`;
    return [
      label,
      input.slice(original.length),
      `${parent}${core.escapeSelector(label)}${pseudo}`,
      pseudoKey
    ];
  };
  return {
    name: `pseudo:${tag}`,
    match(input, ctx) {
      if (!(splitRE && pseudoRE && pseudoColonRE)) {
        splitRE = new RegExp(`(?:${ctx.generator.config.separators.join("|")})`);
        pseudoRE = new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))(?:(/\\w+))?(?:${ctx.generator.config.separators.join("|")})`);
        pseudoColonRE = new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesColonStr}))(?:(/\\w+))?(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
      }
      if (!input.startsWith(tag))
        return;
      const result = matchBracket(input) || matchPseudo(input);
      if (!result)
        return;
      const [label, matcher, prefix, pseudoName = ""] = result;
      if (label !== "")
        core.warnOnce("The labeled variant is experimental and may not follow semver.");
      return {
        matcher,
        handle: (input2, next) => next({
          ...input2,
          prefix: `${prefix}${combinator}${input2.prefix}`.replace(rawRE, "$1$2:"),
          ...pseudoModifier(pseudoName)
        })
      };
    },
    multiPass: true
  };
}
const excludedPseudo = [
  "::-webkit-resizer",
  "::-webkit-scrollbar",
  "::-webkit-scrollbar-button",
  "::-webkit-scrollbar-corner",
  "::-webkit-scrollbar-thumb",
  "::-webkit-scrollbar-track",
  "::-webkit-scrollbar-track-piece",
  "::file-selector-button"
];
const PseudoClassesAndElementsStr = Object.entries(PseudoClasses).map(([key]) => key).join("|");
const PseudoClassesAndElementsColonStr = Object.entries(PseudoClassesColon).map(([key]) => key).join("|");
function variantPseudoClassesAndElements() {
  let PseudoClassesAndElementsRE;
  let PseudoClassesAndElementsColonRE;
  return {
    name: "pseudo",
    match(input, ctx) {
      if (!(PseudoClassesAndElementsRE && PseudoClassesAndElementsRE)) {
        PseudoClassesAndElementsRE = new RegExp(`^(${PseudoClassesAndElementsStr})(?:${ctx.generator.config.separators.join("|")})`);
        PseudoClassesAndElementsColonRE = new RegExp(`^(${PseudoClassesAndElementsColonStr})(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
      }
      const match = input.match(PseudoClassesAndElementsRE) || input.match(PseudoClassesAndElementsColonRE);
      if (match) {
        const pseudo = PseudoClasses[match[1]] || PseudoClassesColon[match[1]] || `:${match[1]}`;
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => {
            const selectors = pseudo.startsWith("::") && !excludedPseudo.includes(pseudo) ? {
              pseudo: `${input2.pseudo}${pseudo}`
            } : {
              selector: `${input2.selector}${pseudo}`
            };
            return next({
              ...input2,
              ...selectors,
              ...pseudoModifier(match[1])
            });
          }
        };
      }
    },
    multiPass: true,
    autocomplete: `(${PseudoClassesAndElementsStr}|${PseudoClassesAndElementsColonStr}):`
  };
}
function variantPseudoClassFunctions() {
  let PseudoClassFunctionsRE;
  let PseudoClassColonFunctionsRE;
  return {
    match(input, ctx) {
      if (!(PseudoClassFunctionsRE && PseudoClassColonFunctionsRE)) {
        PseudoClassFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})(?:${ctx.generator.config.separators.join("|")})`);
        PseudoClassColonFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesColonStr})(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
      }
      const match = input.match(PseudoClassFunctionsRE) || input.match(PseudoClassColonFunctionsRE);
      if (match) {
        const fn = match[1];
        const pseudo = PseudoClasses[match[2]] || PseudoClassesColon[match[2]] || `:${match[2]}`;
        return {
          matcher: input.slice(match[0].length),
          selector: (s) => `${s}:${fn}(${pseudo})`
        };
      }
    },
    multiPass: true,
    autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}|${PseudoClassesColonStr}):`
  };
}
function variantTaggedPseudoClasses(options = {}) {
  const attributify = !!options?.attributifyPseudo;
  return [
    taggedPseudoClassMatcher("group", attributify ? '[group=""]' : ".group", " "),
    taggedPseudoClassMatcher("peer", attributify ? '[peer=""]' : ".peer", "~"),
    taggedPseudoClassMatcher("parent", attributify ? '[parent=""]' : ".parent", ">"),
    taggedPseudoClassMatcher("previous", attributify ? '[previous=""]' : ".previous", "+")
  ];
}
const PartClassesRE = /(part-\[(.+)]:)(.+)/;
const partClasses = {
  match(input) {
    const match = input.match(PartClassesRE);
    if (match) {
      const part = `part(${match[2]})`;
      return {
        matcher: input.slice(match[1].length),
        selector: (s) => `${s}::${part}`
      };
    }
  },
  multiPass: true
};

function variants(options) {
  return [
    variantAria,
    variantDataAttribute,
    variantCssLayer,
    variantSelector,
    variantInternalLayer,
    variantNegative,
    variantImportant(),
    variantSupports,
    variantPrint,
    variantCustomMedia,
    variantBreakpoints(),
    ...variantCombinators,
    variantPseudoClassesAndElements(),
    variantPseudoClassFunctions(),
    ...variantTaggedPseudoClasses(options),
    partClasses,
    ...variantColorsMediaOrClass(options),
    ...variantLanguageDirections,
    variantScope,
    variantContainerQuery,
    variantVariables
  ];
}

exports.calcMaxWidthBySize = calcMaxWidthBySize;
exports.partClasses = partClasses;
exports.variantAria = variantAria;
exports.variantBreakpoints = variantBreakpoints;
exports.variantColorsMediaOrClass = variantColorsMediaOrClass;
exports.variantCombinators = variantCombinators;
exports.variantContainerQuery = variantContainerQuery;
exports.variantCssLayer = variantCssLayer;
exports.variantCustomMedia = variantCustomMedia;
exports.variantDataAttribute = variantDataAttribute;
exports.variantImportant = variantImportant;
exports.variantInternalLayer = variantInternalLayer;
exports.variantLanguageDirections = variantLanguageDirections;
exports.variantNegative = variantNegative;
exports.variantPrint = variantPrint;
exports.variantPseudoClassFunctions = variantPseudoClassFunctions;
exports.variantPseudoClassesAndElements = variantPseudoClassesAndElements;
exports.variantScope = variantScope;
exports.variantSelector = variantSelector;
exports.variantSupports = variantSupports;
exports.variantTaggedPseudoClasses = variantTaggedPseudoClasses;
exports.variantVariables = variantVariables;
exports.variants = variants;
