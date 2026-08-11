import * as PropertySymbol from '../PropertySymbol.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type ICanvasShape from './ICanvasShape.js';
/**
 * The ImageData interface represents the underlying pixel data of an area of a <canvas> element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ImageData
 */
export default class ImageData implements ICanvasShape {
    protected [PropertySymbol.window]: BrowserWindow;
    readonly [PropertySymbol.data]: Uint8ClampedArray;
    readonly [PropertySymbol.width]: number;
    readonly [PropertySymbol.height]: number;
    /**
     * Constructor.
     *
     * @param dataArray A Uint8ClampedArray containing the underlying pixel representation of the image.
     * @param width The width of the ImageData, in pixels.
     * @param height The height of the ImageData, in pixels. If not specified, it is calculated as `dataArray.length / (sw * 4)`.
     */
    constructor(dataArray: Uint8ClampedArray | number, width: number, height?: number);
    /**
     * Returns data.
     *
     * @returns Data.
     */
    get data(): Uint8ClampedArray;
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
}
//# sourceMappingURL=ImageData.d.ts.map