/**
Escape a string and wrap it in quotes, producing a string that is safe to use as a JavaScript string literal.

Escapes backslashes, the quote character, and unsafe characters (C0 control characters, DEL, the U+2028/U+2029 line terminators, which can disrupt line-oriented tooling, and lone surrogates, which have no valid UTF-8 representation).

@param string - The string to quote and escape.
@param quote - The quote character to wrap the string in. Default: `'`.
@returns The quoted and escaped string, ready to use as JavaScript source code.

@example
```
import quoteJsString from 'quote-js-string';

quoteJsString('It\'s a test');
//=> `'It\\'s a test'`

quoteJsString('It\'s a test', '"');
//=> `"It's a test"`

quoteJsString('line1\nline2');
//=> `'line1\\nline2'`
```
*/
export default function quoteJsString(string: string, quote?: '\'' | '"'): string;
