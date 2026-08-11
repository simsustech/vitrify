/**
 * Creating a ReadableStream initiates the stream and creates a Promise internally in Node.js.
 * This Promise is not accessible and cannot be awaited.
 *
 * This class provides a way to wrap a ReadableStream and consume it when needed.
 */
export class ReadableStreamWrapper {
    #read;
    #readableStream = null;
    /**
     * Constructor.
     *
     * @param read Function that returns a ReadableStream when called.
     */
    constructor(read) {
        this.#read = read;
    }
    /**
     * Returns the ReadableStream. If the stream has already been created, it returns the existing instance.
     *
     * @returns ReadableStream instance
     */
    get readableStream() {
        if (!this.#readableStream) {
            this.#readableStream = this.#read();
        }
        return this.#readableStream;
    }
}
//# sourceMappingURL=ReadableStreamWrapper.js.map