import Blob from '../file/Blob.js';
import type ICanvasRenderingContext2D from './ICanvasRenderingContext2D.js';
import type ImageBitmap from './ImageBitmap.js';
import * as PropertySymbol from '../PropertySymbol.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type ICanvasShape from './ICanvasShape.js';
/**
 * The OffscreenCanvas interface provides a canvas that can be rendered off screen, decoupling the DOM and the Canvas API so that the <canvas> element is no longer entirely dependent on the DOM.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/OffscreenCanvas
 */
export default class OffscreenCanvas implements ICanvasShape {
    protected [PropertySymbol.window]: BrowserWindow;
    protected [PropertySymbol.context]: ICanvasRenderingContext2D | null;
    readonly width: number;
    readonly height: number;
    /**
     * Constructor.
     *
     * @param width Width.
     * @param height Height.
     */
    constructor(width: number, height: number);
    /**
     * Returns context.
     *
     * @param contextType Context type.
     * @param [contextAttributes] Context attributes.
     * @returns Context.
     */
    getContext(contextType: '2d' | 'webgl' | 'webgl2' | 'webgpu' | 'bitmaprenderer', contextAttributes?: {
        [key: string]: any;
    }): ICanvasRenderingContext2D | null;
    /**
     * Converts the canvas to a Blob.
     *
     * @param options Options.
     * @param options.type Type.
     * @param options.quality Quality.
     * @returns Blob.
     */
    convertToBlob(options?: {
        type?: string;
        quality?: any;
    }): Promise<Blob>;
    /**
     * Creates an ImageBitmap object from the most recently rendered image of the OffscreenCanvas.
     *
     * The image in the OffscreenCanvas is replaced with a new blank image for subsequent rendering.
     *
     * @returns ImageBitmap.
     */
    transferToImageBitmap(): ImageBitmap;
}
//# sourceMappingURL=OffscreenCanvas.d.ts.map