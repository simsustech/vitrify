import OffscreenCanvas from './OffscreenCanvas.js';
import * as PropertySymbol from '../PropertySymbol.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type IImageBitmapOptions from './IImageBitmapOptions.js';
import type { TImageBitmapSource } from './TImageBitmapSource.js';
import type ICanvasShape from './ICanvasShape.js';
/**
 * Image Bitmap.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
 */
export default class ImageBitmap implements ICanvasShape {
    [PropertySymbol.canvas]: OffscreenCanvas | null;
    [PropertySymbol.width]: number;
    [PropertySymbol.height]: number;
    [PropertySymbol.options]: IImageBitmapOptions | null;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol
     * @param window Window.
     * @param source Source.
     * @param [sx] X.
     * @param [sy] Y.
     * @param [sw] Width.
     * @param [sh] Height.
     * @param [options] Options.
     */
    constructor(illegalConstructorSymbol: symbol, window: BrowserWindow, source: TImageBitmapSource, sx?: number | IImageBitmapOptions, sy?: number, sw?: number | IImageBitmapOptions, sh?: number, options?: IImageBitmapOptions);
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width(): number;
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height(): number;
    /**
     * Disposes of all graphical resources associated with an ImageBitmap.
     */
    close(): void;
}
//# sourceMappingURL=ImageBitmap.d.ts.map