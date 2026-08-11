# Installation
> `npm install --save @types/stringify-object`

# Summary
This package contains type definitions for stringify-object (https://github.com/yeoman/stringify-object).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/stringify-object.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/stringify-object/index.d.ts)
````ts
/**
 * Stringify an object/array like JSON.stringify just without all the double-quotes
 */
export default function stringifyObject(input: any, options?: Options, pad?: string): string;

export interface Options {
    /**
     * Preferred indentation
     * @default '\t'
     */
    indent?: string | undefined;
    /**
     * Set to false to get double-quoted strings
     * @default true
     */
    singleQuotes?: boolean | undefined;
    /**
     * Expected to return a boolean of whether to include the property property of the object object in the output.
     */
    filter?(input: any, prop: string | symbol): boolean;
    /**
     * When set, will inline values up to inlineCharacterLimit length for the sake of more terse output.
     */
    inlineCharacterLimit?: number | undefined;
    /**
     * Expected to return a string that transforms the string that resulted from stringifying object[property].
     * This can be used to detect special types of objects that need to be stringified in a particular way.
     * The transform function might return an alternate string in this case, otherwise returning the originalResult.
     */
    transform?: ((input: any[] | object, prop: number | string | symbol, originalResult: string) => string) | undefined;
}

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 15:11:36 GMT
 * Dependencies: none

# Credits
These definitions were written by [Piotr Błażejewicz](https://github.com/peterblazejewicz).
