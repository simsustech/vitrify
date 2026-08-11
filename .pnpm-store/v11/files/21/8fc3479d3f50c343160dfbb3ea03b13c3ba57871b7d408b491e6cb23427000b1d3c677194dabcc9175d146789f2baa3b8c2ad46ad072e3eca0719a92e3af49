import EventTarget from '../event/EventTarget.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type ICookieStoreGetOptions from './ICookieStoreGetOptions.js';
import type ICookieStoreSetOptions from './ICookieStoreSetOptions.js';
import type ICookieStoreDeleteOptions from './ICookieStoreDeleteOptions.js';
import type ICookieStoreItem from './ICookieStoreItem.js';
/**
 * CookieStore.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CookieStore
 */
export default class CookieStore extends EventTarget {
    #private;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param window Window.
     */
    constructor(illegalConstructorSymbol: symbol, window: BrowserWindow);
    /**
     * Returns a cookie.
     *
     * @param [nameOrOptions] Name or options.
     * @returns Cookie.
     */
    get(nameOrOptions?: string | ICookieStoreGetOptions): Promise<ICookieStoreItem | null>;
    /**
     * Returns all cookies.
     *
     * @param [nameOrOptions] Name or options.
     * @returns Cookies.
     */
    getAll(nameOrOptions?: string | ICookieStoreGetOptions): Promise<ICookieStoreItem[]>;
    /**
     * Sets a cookie.
     *
     * @param nameOrOptions Name or options.
     * @param [value] Value.
     * @returns Promise.
     */
    set(nameOrOptions: string | ICookieStoreSetOptions, value?: string): Promise<void>;
    /**
     * Deletes a cookie.
     *
     * @param nameOrOptions Name or options.
     * @returns Promise.
     */
    delete(nameOrOptions: string | ICookieStoreDeleteOptions): Promise<void>;
}
//# sourceMappingURL=CookieStore.d.ts.map