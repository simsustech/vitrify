import * as PropertySymbol from '../PropertySymbol.js';
/**
 * The ImageData interface represents the underlying pixel data of an area of a <canvas> element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ImageData
 */
export default class ImageData {
    [PropertySymbol.data];
    [PropertySymbol.width];
    [PropertySymbol.height];
    /**
     * Constructor.
     *
     * @param dataArray A Uint8ClampedArray containing the underlying pixel representation of the image.
     * @param width The width of the ImageData, in pixels.
     * @param height The height of the ImageData, in pixels. If not specified, it is calculated as `dataArray.length / (sw * 4)`.
     */
    constructor(dataArray, width, height) {
        if (arguments.length < 2) {
            throw new this[PropertySymbol.window].TypeError(`Failed to construct 'ImageData': 2 arguments required, but only ${arguments.length} present.`);
        }
        if (dataArray instanceof Uint8ClampedArray) {
            if (typeof width !== 'number') {
                throw new this[PropertySymbol.window].TypeError(`Failed to construct 'ImageData': The width argument must be a number.`);
            }
            if (height !== undefined && typeof height !== 'number') {
                throw new this[PropertySymbol.window].TypeError(`Failed to construct 'ImageData': The height argument must be a number.`);
            }
            this[PropertySymbol.data] = dataArray;
            this[PropertySymbol.width] = width;
            this[PropertySymbol.height] = height !== undefined ? height : dataArray.length / (width * 4);
        }
        else {
            if (typeof width !== 'number') {
                throw new this[PropertySymbol.window].TypeError(`Failed to construct 'ImageData': The height argument must be a number.`);
            }
            this[PropertySymbol.data] = new Uint8ClampedArray(new Array(dataArray * width * 4).fill(0));
            this[PropertySymbol.width] = dataArray;
            this[PropertySymbol.height] = width;
        }
    }
    /**
     * Returns data.
     *
     * @returns Data.
     */
    get data() {
        return this[PropertySymbol.data];
    }
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width() {
        return this[PropertySymbol.width];
    }
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height() {
        return this[PropertySymbol.height];
    }
}
//# sourceMappingURL=ImageData.js.map