import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Blob from '../../file/Blob.js';
import OffscreenCanvas from '../../canvas/OffscreenCanvas.js';
import ElementEventAttributeUtility from '../element/ElementEventAttributeUtility.js';
import WindowBrowserContext from '../../window/WindowBrowserContext.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
const DEVICE_ID = 'S3F/aBCdEfGHIjKlMnOpQRStUvWxYz1234567890+1AbC2DEf2GHi3jK34le+ab12C3+1aBCdEf==';
var CanvasModeEnum;
(function (CanvasModeEnum) {
    CanvasModeEnum["none"] = "none";
    CanvasModeEnum["context"] = "context";
    CanvasModeEnum["offscreen"] = "offscreen";
})(CanvasModeEnum || (CanvasModeEnum = {}));
/**
 * HTMLCanvasElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
 */
export default class HTMLCanvasElement extends HTMLElement {
    // Private properties
    #mode = CanvasModeEnum.none;
    #offscreenCanvas = null;
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get oncontextlost() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncontextlost');
    }
    set oncontextlost(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontextlost', value);
    }
    get oncontextrestored() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncontextrestored');
    }
    set oncontextrestored(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontextrestored', value);
    }
    get onwebglcontextcreationerror() {
        return ElementEventAttributeUtility.getEventListener(this, 'onwebglcontextcreationerror');
    }
    set onwebglcontextcreationerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebglcontextcreationerror', value);
    }
    get onwebglcontextlost() {
        return ElementEventAttributeUtility.getEventListener(this, 'onwebglcontextlost');
    }
    set onwebglcontextlost(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebglcontextlost', value);
    }
    get onwebglcontextrestored() {
        return ElementEventAttributeUtility.getEventListener(this, 'onwebglcontextrestored');
    }
    set onwebglcontextrestored(value) {
        this[PropertySymbol.propertyEventListeners].set('onwebglcontextrestored', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width() {
        const width = this.getAttribute('width');
        if (width === null) {
            return 300;
        }
        const parsed = parseInt(width, 10);
        return isNaN(parsed) ? 300 : parsed;
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
            return 150;
        }
        const parsed = parseInt(height, 10);
        return isNaN(parsed) ? 150 : parsed;
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
     * Returns capture stream.
     *
     * @param [frameRate] Frame rate.
     * @returns Capture stream.
     */
    captureStream(frameRate) {
        const stream = new this[PropertySymbol.window].MediaStream();
        const track = new this[PropertySymbol.window].CanvasCaptureMediaStreamTrack(PropertySymbol.illegalConstructor, this);
        track[PropertySymbol.kind] = 'video';
        track[PropertySymbol.capabilities].deviceId = DEVICE_ID;
        track[PropertySymbol.capabilities].aspectRatio.max = this.width;
        track[PropertySymbol.capabilities].height.max = this.height;
        track[PropertySymbol.capabilities].width.max = this.width;
        track[PropertySymbol.settings].deviceId = DEVICE_ID;
        if (frameRate !== undefined) {
            track[PropertySymbol.capabilities].frameRate.max = frameRate;
            track[PropertySymbol.settings].frameRate = frameRate;
        }
        stream.addTrack(track);
        return stream;
    }
    /**
     * Returns context.
     *
     * @param contextType Context type.
     * @param [contextAttributes] Context attributes.
     * @returns Context.
     */
    getContext(contextType, contextAttributes) {
        if (this.#mode === CanvasModeEnum.offscreen) {
            throw new this[PropertySymbol.window].DOMException(`Failed to execute 'getContext' on 'HTMLCanvasElement': Cannot get context from a canvas that has transferred its control to offscreen.`, DOMExceptionNameEnum.invalidStateError);
        }
        this.#mode = CanvasModeEnum.context;
        const browserFrame = new WindowBrowserContext(this[PropertySymbol.window]).getBrowserFrame();
        if (!browserFrame) {
            throw new this[PropertySymbol.window].Error(`Failed to execute 'getContext' on 'HTMLCanvasElement': Browser frame is not available. This happens when the browser is closing.`);
        }
        const settings = new WindowBrowserContext(this[PropertySymbol.window]).getSettings();
        const adapter = settings?.canvasAdapter;
        if (!adapter) {
            return null;
        }
        return adapter.getContext({
            browserFrame,
            window: this[PropertySymbol.window],
            canvas: this
        }, contextType, contextAttributes);
    }
    /**
     * Returns to data URL.
     *
     * @param [type] Type.
     * @param [quality] Quality.
     * @returns Data URL.
     */
    toDataURL(type, quality) {
        const browserFrame = new WindowBrowserContext(this[PropertySymbol.window]).getBrowserFrame();
        if (!browserFrame) {
            throw new this[PropertySymbol.window].Error(`Failed to execute 'toDataURL' on 'HTMLCanvasElement': Browser frame is not available. This happens when the browser is closing.`);
        }
        const settings = new WindowBrowserContext(this[PropertySymbol.window]).getSettings();
        const adapter = settings?.canvasAdapter;
        if (!adapter) {
            return `data:${type || 'image/png'};base64,${Buffer.from([]).toString('base64')}`;
        }
        if (this.#offscreenCanvas) {
            return adapter.toDataURL({
                browserFrame,
                window: this[PropertySymbol.window],
                canvas: this.#offscreenCanvas
            }, type, quality);
        }
        return adapter.toDataURL({
            browserFrame,
            window: this[PropertySymbol.window],
            canvas: this
        }, type, quality);
    }
    /**
     * Returns to blob.
     *
     * @param callback Callback.
     * @param [type] Type.
     * @param [quality] Quality.
     */
    toBlob(callback, type, quality) {
        const browserFrame = new WindowBrowserContext(this[PropertySymbol.window]).getBrowserFrame();
        if (!browserFrame) {
            throw new this[PropertySymbol.window].Error(`Failed to execute 'toBlob' on 'HTMLCanvasElement': Browser frame is not available. This happens when the browser is closing.`);
        }
        const settings = new WindowBrowserContext(this[PropertySymbol.window]).getSettings();
        const adapter = settings?.canvasAdapter;
        if (!adapter) {
            this[PropertySymbol.window].requestAnimationFrame(() => callback(new Blob([], { type: type || 'image/png' })));
            return;
        }
        if (this.#offscreenCanvas) {
            adapter.toBlob({
                browserFrame,
                window: this[PropertySymbol.window],
                canvas: this.#offscreenCanvas
            }, callback, type, quality);
            return;
        }
        adapter.toBlob({
            browserFrame,
            window: this[PropertySymbol.window],
            canvas: this
        }, callback, type, quality);
    }
    /**
     * Transfers control to offscreen.
     *
     * @returns Offscreen canvas.
     */
    transferControlToOffscreen() {
        if (this.#mode === CanvasModeEnum.context) {
            throw new this[PropertySymbol.window].DOMException(`Failed to execute 'transferControlToOffscreen' on 'HTMLCanvasElement': Cannot transfer control from a canvas that has a rendering context.`, DOMExceptionNameEnum.invalidStateError);
        }
        if (this.#mode === CanvasModeEnum.offscreen) {
            throw new this[PropertySymbol.window].DOMException(`Failed to execute 'transferControlToOffscreen' on 'HTMLCanvasElement': Cannot transfer control from a canvas for more than one time.`, DOMExceptionNameEnum.invalidStateError);
        }
        this.#mode = CanvasModeEnum.offscreen;
        this.#offscreenCanvas = new OffscreenCanvas(this.width, this.height);
        return this.#offscreenCanvas;
    }
}
//# sourceMappingURL=HTMLCanvasElement.js.map