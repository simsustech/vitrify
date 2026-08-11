import * as PropertySymbol from '../PropertySymbol.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type { TDOMMatrixInit } from './dom-matrix/TDOMMatrixInit.js';
import type IDOMPointInit from './IDOMPointInit.js';
/**
 * DOM Point Readonly.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMPointReadOnly
 */
export default class DOMPointReadOnly implements IDOMPointInit {
    protected [PropertySymbol.window]: BrowserWindow;
    protected [PropertySymbol.x]: number;
    protected [PropertySymbol.y]: number;
    protected [PropertySymbol.z]: number;
    protected [PropertySymbol.w]: number;
    /**
     * Constructor.
     *
     * @param [x] X position.
     * @param [y] Y position.
     * @param [z] Width.
     * @param [w] Height.
     */
    constructor(x?: number | null, y?: number | null, z?: number | null, w?: number | null);
    /**
     * Returns x.
     *
     * @returns X.
     */
    get x(): number;
    /**
     * Returns y.
     *
     * @returns Y.
     */
    get y(): number;
    /**
     * Returns z.
     *
     * @returns Z.
     */
    get z(): number;
    /**
     * Returns w.
     *
     * @returns W.
     */
    get w(): number;
    /**
     * Returns the JSON representation of the object.
     *
     * @returns JSON representation.
     */
    toJSON(): object;
    /**
     * Returns a new DOMPointReadOnly object.
     *
     * @param [otherPoint] Other point.
     * @returns Cloned object.
     */
    static fromPoint(otherPoint?: IDOMPointInit): DOMPointReadOnly;
    /**
     * The matrixTransform() method of the DOMPointReadOnly interface applies a matrix transform specified as an object to the DOMPointReadOnly object, creating and returning a new DOMPointReadOnly object.
     *
     * @param [init] DOM Matrix init.
     * @returns DOMPointReadOnly object.
     */
    matrixTransform(init?: TDOMMatrixInit): DOMPointReadOnly;
}
//# sourceMappingURL=DOMPointReadOnly.d.ts.map