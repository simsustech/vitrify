import { Preflight, PresetOptions, Preset, Postprocessor } from '@unocss/core';
export { c as colors } from './colors-e683aa85.js';
export { t as theme } from './default-d9218dd5.js';
import { T as Theme } from './types-f73ecdfe.js';
export { T as Theme, a as ThemeAnimation } from './types-f73ecdfe.js';
export { p as parseColor } from './utilities-73daa267.js';

declare const preflights: Preflight[];

interface DarkModeSelectors {
    /**
     * Selector for light variant.
     *
     * @default '.light'
     */
    light?: string;
    /**
     * Selector for dark variant.
     *
     * @default '.dark'
     */
    dark?: string;
}
interface PresetMiniOptions extends PresetOptions {
    /**
     * Dark mode options
     *
     * @default 'class'
     */
    dark?: 'class' | 'media' | DarkModeSelectors;
    /**
     * Generate pseudo selector as `[group=""]` instead of `.group`
     *
     * @default false
     */
    attributifyPseudo?: Boolean;
    /**
     * Prefix for CSS variables.
     *
     * @default 'un-'
     */
    variablePrefix?: string;
    /**
     * Utils prefix
     *
     * @default undefined
     */
    prefix?: string | string[];
    /**
     * Generate preflight
     *
     * @default true
     */
    preflight?: boolean;
    /**
     * Enable arbitrary variants, for example `<div class="[&>*]:m-1 [&[open]]:p-2"></div>`.
     *
     * Disable this might slightly improve the performance.
     *
     * @default true
     */
    arbitraryVariants?: boolean;
}
declare function presetMini(options?: PresetMiniOptions): Preset<Theme>;

declare function VarPrefixPostprocessor(prefix: string): Postprocessor | undefined;
declare function normalizePreflights(preflights: Preflight[], variablePrefix: string): Preflight<{}>[];

export { DarkModeSelectors, PresetMiniOptions, VarPrefixPostprocessor, presetMini as default, normalizePreflights, preflights, presetMini };
