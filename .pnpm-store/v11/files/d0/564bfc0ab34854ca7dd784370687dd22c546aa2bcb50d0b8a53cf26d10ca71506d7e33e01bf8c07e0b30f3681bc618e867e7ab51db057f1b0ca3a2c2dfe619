import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import ElementEventAttributeUtility from '../element/ElementEventAttributeUtility.js';
import WindowBrowserContext from '../../window/WindowBrowserContext.js';
import BufferImageSize from 'buffer-image-size';
const DATA_URL_REGEX = /^\s*data:([^,]+)?,(.*)/;
/**
 * HTML Image Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement.
 */
export default class HTMLImageElement extends HTMLElement {
    [PropertySymbol.tagName] = 'IMG';
    [PropertySymbol.complete] = true;
    [PropertySymbol.naturalHeight] = 0;
    [PropertySymbol.naturalWidth] = 0;
    [PropertySymbol.loading] = 'auto';
    [PropertySymbol.x] = 0;
    [PropertySymbol.y] = 0;
    [PropertySymbol.buffer] = null;
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get onload() {
        return ElementEventAttributeUtility.getEventListener(this, 'onload');
    }
    set onload(value) {
        this[PropertySymbol.propertyEventListeners].set('onload', value);
    }
    get onerror() {
        return ElementEventAttributeUtility.getEventListener(this, 'onerror');
    }
    set onerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onerror', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns complete.
     *
     * @returns Complete.
     */
    get complete() {
        return this[PropertySymbol.complete];
    }
    /**
     * Returns natural height.
     *
     * @returns Natural height.
     */
    get naturalHeight() {
        return this[PropertySymbol.naturalHeight];
    }
    /**
     * Returns natural width.
     *
     * @returns Natural width.
     */
    get naturalWidth() {
        return this[PropertySymbol.naturalWidth];
    }
    /**
     * Returns loading.
     *
     * @returns Loading.
     */
    get loading() {
        const loading = this.getAttribute('loading');
        return loading === 'eager' || loading === 'lazy' ? loading : 'auto';
    }
    /**
     * Sets loading.
     *
     * @param loading Loading.
     */
    set loading(loading) {
        this.setAttribute('loading', loading);
    }
    /**
     * Returns x.
     */
    get x() {
        return this[PropertySymbol.x];
    }
    /**
     * Returns y.
     */
    get y() {
        return this[PropertySymbol.y];
    }
    /**
     * Returns decoding.
     *
     * @returns Decoding.
     */
    get decoding() {
        return this.getAttribute('decoding') || 'auto';
    }
    /**
     * Sets decoding.
     *
     * @param decoding Decoding.
     */
    set decoding(decoding) {
        this.setAttribute('decoding', decoding);
    }
    /**
     * Returns cross origin.
     *
     * @returns Cross origin.
     */
    get crossOrigin() {
        return this.getAttribute('crossOrigin');
    }
    /**
     * Sets cross origin.
     *
     * @param crossOrigin Cross origin.
     */
    set crossOrigin(crossOrigin) {
        if (crossOrigin === 'anonymous' || crossOrigin === 'use-credentials') {
            this.setAttribute('crossOrigin', crossOrigin);
        }
    }
    /**
     * Returns alt.
     *
     * @returns Alt.
     */
    get alt() {
        return this.getAttribute('alt') || '';
    }
    /**
     * Sets alt.
     *
     * @param alt Alt.
     */
    set alt(alt) {
        this.setAttribute('alt', alt);
    }
    /**
     * Returns current src.
     *
     * @returns Current src.
     */
    get currentSrc() {
        return this.src;
    }
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width() {
        const width = this.getAttribute('width');
        if (width === null) {
            return this[PropertySymbol.naturalWidth];
        }
        const parsed = parseInt(width, 10);
        return isNaN(parsed) || parsed <= 0 ? this[PropertySymbol.naturalWidth] : parsed;
    }
    /**
     * Sets width.
     *
     * @param width Width.
     */
    set width(width) {
        this.setAttribute('width', String(width));
    }
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height() {
        const height = this.getAttribute('height');
        if (height === null) {
            return this[PropertySymbol.naturalHeight];
        }
        const parsed = parseInt(height, 10);
        return isNaN(parsed) || parsed <= 0 ? this[PropertySymbol.naturalHeight] : parsed;
    }
    /**
     * Sets height.
     *
     * @param height Height.
     */
    set height(height) {
        this.setAttribute('height', String(height));
    }
    /**
     * Returns is map.
     *
     * @returns Is map.
     */
    get isMap() {
        return this.getAttribute('ismap') !== null;
    }
    /**
     * Sets is map.
     *
     * @param ismap Is map.
     */
    set isMap(isMap) {
        if (!isMap) {
            this.removeAttribute('ismap');
        }
        else {
            this.setAttribute('ismap', '');
        }
    }
    /**
     * Returns referrer policy.
     *
     * @returns Referrer policy.
     */
    get referrerPolicy() {
        return this.getAttribute('referrerpolicy') || '';
    }
    /**
     * Sets referrer policy.
     *
     * @param referrerPolicy Referrer policy.
     */
    set referrerPolicy(referrerPolicy) {
        this.setAttribute('referrerpolicy', referrerPolicy);
    }
    /**
     * Returns sizes.
     *
     * @returns Sizes.
     */
    get sizes() {
        return this.getAttribute('sizes') || '';
    }
    /**
     * Sets sizes.
     *
     * @param sizes Sizes.
     */
    set sizes(sizes) {
        this.setAttribute('sizes', sizes);
    }
    /**
     * Returns source.
     *
     * @returns Source.
     */
    get src() {
        const href = this.getAttribute('src');
        if (!href) {
            return '';
        }
        return this.#parseUrl(href) || this.getAttribute('src') || '';
    }
    /**
     * Sets source.
     *
     * @param src Source.
     */
    set src(src) {
        this.setAttribute('src', src);
    }
    /**
     * Returns srcset.
     *
     * @returns Source.
     */
    get srcset() {
        return this.getAttribute('srcset') || '';
    }
    /**
     * Sets src set.
     *
     * @param srcset Src set.
     */
    set srcset(srcset) {
        this.setAttribute('srcset', srcset);
    }
    /**
     * Returns use map.
     *
     * @returns Use map.
     */
    get useMap() {
        return this.getAttribute('usemap') || '';
    }
    /**
     * Sets is map.
     *
     * @param useMap Is map.
     */
    set useMap(useMap) {
        this.setAttribute('usemap', useMap);
    }
    /**
     * The decode() method of the HTMLImageElement interface returns a Promise that resolves when the image is decoded and it is safe to append the image to the DOM.
     *
     * @returns Promise.
     */
    decode() {
        return Promise.resolve();
    }
    /**
     * @override
     */
    [PropertySymbol.onSetAttribute](attribute, replacedAttribute) {
        super[PropertySymbol.onSetAttribute](attribute, replacedAttribute);
        if (attribute[PropertySymbol.name] === 'src') {
            const url = this.#parseUrl(attribute[PropertySymbol.value]);
            if (!url) {
                this[PropertySymbol.complete] = true;
                this[PropertySymbol.naturalHeight] = 0;
                this[PropertySymbol.naturalWidth] = 0;
                this.dispatchEvent(new this[PropertySymbol.window].Event('error'));
                return;
            }
            if (this.#loadDataUrl(url)) {
                return;
            }
            const settings = new WindowBrowserContext(this[PropertySymbol.window]).getSettings();
            if (settings?.enableImageFileLoading) {
                this.#loadUrlSource(this.src);
            }
        }
    }
    /**
     * @override
     */
    [PropertySymbol.onRemoveAttribute](removedAttribute) {
        super[PropertySymbol.onRemoveAttribute](removedAttribute);
        if (removedAttribute[PropertySymbol.name] === 'src') {
            this[PropertySymbol.complete] = true;
            this[PropertySymbol.naturalHeight] = 0;
            this[PropertySymbol.naturalWidth] = 0;
            this[PropertySymbol.buffer] = null;
        }
    }
    /**
     * Parses the given source URL.
     *
     * @param src Source.
     * @returns Parsed URL or null if the URL is invalid.
     */
    #parseUrl(src) {
        if (src === null) {
            return null;
        }
        try {
            return new URL(src, this[PropertySymbol.ownerDocument].location.href).href;
        }
        catch {
            // Ignore
        }
        return null;
    }
    /**
     * Loads the image from the given data URL.
     *
     * @param src Source.
     * @returns True if the image was loaded, false otherwise.
     */
    #loadDataUrl(src) {
        const dataUrlMatch = src.match(DATA_URL_REGEX);
        if (dataUrlMatch) {
            const buffer = Buffer.from(dataUrlMatch[2], 'base64');
            this[PropertySymbol.complete] = true;
            this[PropertySymbol.buffer] = buffer;
            try {
                const dimensions = BufferImageSize(buffer);
                this[PropertySymbol.naturalHeight] = dimensions.height;
                this[PropertySymbol.naturalWidth] = dimensions.width;
            }
            catch (e) {
                this[PropertySymbol.naturalHeight] = 0;
                this[PropertySymbol.naturalWidth] = 0;
            }
            this.dispatchEvent(new this[PropertySymbol.window].Event('load'));
            return true;
        }
        return false;
    }
    /**
     * Loads the image from the given source.
     *
     * @param src Source.
     */
    async #loadUrlSource(src) {
        this[PropertySymbol.complete] = false;
        this[PropertySymbol.naturalHeight] = 0;
        this[PropertySymbol.naturalWidth] = 0;
        this[PropertySymbol.buffer] = null;
        let response = null;
        let error = null;
        try {
            response = await this[PropertySymbol.window].fetch(src);
        }
        catch (e) {
            error = e;
        }
        if (error || !response?.ok) {
            this[PropertySymbol.complete] = true;
            this.dispatchEvent(new this[PropertySymbol.window].Event('error'));
            if (response) {
                this[PropertySymbol.window].console.error(`GET ${src} ${response.status} (${response.statusText}).`);
            }
            else if (error) {
                this[PropertySymbol.window].console.error(error);
            }
            return;
        }
        let buffer;
        try {
            buffer = await response.buffer();
        }
        catch (e) {
            this[PropertySymbol.complete] = true;
            this.dispatchEvent(new this[PropertySymbol.window].Event('error'));
            return;
        }
        this[PropertySymbol.complete] = true;
        this[PropertySymbol.buffer] = buffer;
        try {
            const dimensions = BufferImageSize(buffer);
            this[PropertySymbol.naturalHeight] = dimensions.height;
            this[PropertySymbol.naturalWidth] = dimensions.width;
        }
        catch (e) {
            this[PropertySymbol.naturalHeight] = 0;
            this[PropertySymbol.naturalWidth] = 0;
        }
        this.dispatchEvent(new this[PropertySymbol.window].Event('load'));
    }
}
//# sourceMappingURL=HTMLImageElement.js.map