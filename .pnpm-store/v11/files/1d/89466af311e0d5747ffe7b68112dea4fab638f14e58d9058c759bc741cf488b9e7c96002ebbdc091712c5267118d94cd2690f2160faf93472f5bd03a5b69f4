import HTMLElement from '../html-element/HTMLElement.js';
import Blob from '../../file/Blob.js';
import OffscreenCanvas from '../../canvas/OffscreenCanvas.js';
import type Event from '../../event/Event.js';
import type MediaStream from '../html-media-element/MediaStream.js';
import type ICanvas from '../../canvas/ICanvasShape.js';
import type ICanvasRenderingContext2D from '../../canvas/ICanvasRenderingContext2D.js';
/**
 * HTMLCanvasElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
 */
export default class HTMLCanvasElement extends HTMLElement implements ICanvas {
    #private;
    get oncontextlost(): ((event: Event) => void) | null;
    set oncontextlost(value: ((event: Event) => void) | null);
    get oncontextrestored(): ((event: Event) => void) | null;
    set oncontextrestored(value: ((event: Event) => void) | null);
    get onwebglcontextcreationerror(): ((event: Event) => void) | null;
    set onwebglcontextcreationerror(value: ((event: Event) => void) | null);
    get onwebglcontextlost(): ((event: Event) => void) | null;
    set onwebglcontextlost(value: ((event: Event) => void) | null);
    get onwebglcontextrestored(): ((event: Event) => void) | null;
    set onwebglcontextrestored(value: ((event: Event) => void) | null);
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width(): number;
    /**
     * Sets width.
     *
     * @param width Width.
     */
    set width(width: number);
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height(): number;
    /**
     * Sets height.
     *
     * @param height Height.
     */
    set height(height: number);
    /**
     * Returns capture stream.
     *
     * @param [frameRate] Frame rate.
     * @returns Capture stream.
     */
    captureStream(frameRate?: number): MediaStream;
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
     * Returns to data URL.
     *
     * @param [type] Type.
     * @param [quality] Quality.
     * @returns Data URL.
     */
    toDataURL(type?: string, quality?: number): string;
    /**
     * Returns to blob.
     *
     * @param callback Callback.
     * @param [type] Type.
     * @param [quality] Quality.
     */
    toBlob(callback: (blob: Blob | null) => void, type?: string, quality?: any): void;
    /**
     * Transfers control to offscreen.
     *
     * @returns Offscreen canvas.
     */
    transferControlToOffscreen(): OffscreenCanvas;
}
//# sourceMappingURL=HTMLCanvasElement.d.ts.map