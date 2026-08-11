import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
import Blob from '../file/Blob.js';
import WindowBrowserContext from '../window/WindowBrowserContext.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * The OffscreenCanvas interface provides a canvas that can be rendered off screen, decoupling the DOM and the Canvas API so that the <canvas> element is no longer entirely dependent on the DOM.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/OffscreenCanvas
 */
export default class OffscreenCanvas {
    [PropertySymbol.context] = null;
    width;
    height;
    /**
     * Constructor.
     *
     * @param width Width.
     * @param height Height.
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    /**
     * Returns context.
     *
     * @param contextType Context type.
     * @param [contextAttributes] Context attributes.
     * @returns Context.
     */
    getContext(contextType, contextAttributes) {
        const browserFrame = new WindowBrowserContext(this[PropertySymbol.window]).getBrowserFrame();
        if (!browserFrame) {
            throw new this[PropertySymbol.window].Error(`Failed to execute 'getContext' on 'OffscreenCanvas': Browser frame is not available. This happens when the browser is closing.`);
        }
        const settings = new WindowBrowserContext(this[PropertySymbol.window]).getSettings();
        const adapter = settings?.canvasAdapter;
        if (!adapter) {
            return null;
        }
        this[PropertySymbol.context] = adapter.getContext({
            window: this[PropertySymbol.window],
            browserFrame,
            canvas: this
        }, contextType, contextAttributes);
        return this[PropertySymbol.context];
    }
    /**
     * Converts the canvas to a Blob.
     *
     * @param options Options.
     * @param options.type Type.
     * @param options.quality Quality.
     * @returns Blob.
     */
    convertToBlob(options) {
        const browserFrame = new WindowBrowserContext(this[PropertySymbol.window]).getBrowserFrame();
        if (!browserFrame) {
            throw new this[PropertySymbol.window].Error(`Failed to execute 'getContext' on 'OffscreenCanvas': Browser frame is not available. This happens when the browser is closing.`);
        }
        const settings = new WindowBrowserContext(this[PropertySymbol.window]).getSettings();
        const adapter = settings?.canvasAdapter;
        if (!adapter) {
            return new Promise((resolve) => {
                this[PropertySymbol.window].requestAnimationFrame(() => resolve(new Blob([], options)));
            });
        }
        return new Promise((resolve, reject) => {
            adapter.toBlob({
                window: this[PropertySymbol.window],
                browserFrame,
                canvas: this
            }, (blob) => {
                if (blob) {
                    resolve(blob);
                }
                else {
                    reject(new this[PropertySymbol.window].DOMException(`Failed to execute 'convertToBlob' on 'OffscreenCanvas': The canvas could not be converted to a Blob.`, DOMExceptionNameEnum.encodingError));
                }
            }, options?.type, options?.quality);
        });
    }
    /**
     * Creates an ImageBitmap object from the most recently rendered image of the OffscreenCanvas.
     *
     * The image in the OffscreenCanvas is replaced with a new blank image for subsequent rendering.
     *
     * @returns ImageBitmap.
     */
    transferToImageBitmap() {
        const browserFrame = new WindowBrowserContext(this[PropertySymbol.window]).getBrowserFrame();
        if (!browserFrame) {
            throw new this[PropertySymbol.window].Error(`Failed to execute 'getContext' on 'OffscreenCanvas': Browser frame is not available. This happens when the browser is closing.`);
        }
        const window = this[PropertySymbol.window];
        const settings = new WindowBrowserContext(window).getSettings();
        const adapter = settings?.canvasAdapter;
        if (!adapter) {
            return new window.ImageBitmap(PropertySymbol.illegalConstructor, this[PropertySymbol.window], this);
        }
        const context = this[PropertySymbol.context];
        if (!context) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'transferToImageBitmap' on 'OffscreenCanvas': Cannot transfer an ImageBitmap from an OffscreenCanvas with no context`);
        }
        const imageBitmap = new window.ImageBitmap(PropertySymbol.illegalConstructor, this[PropertySymbol.window], this);
        context.clearRect(0, 0, this.width, this.height);
        return imageBitmap;
    }
}
//# sourceMappingURL=OffscreenCanvas.js.map