# quote-js-string

> Escape a string and wrap it in quotes to produce a safe JavaScript string literal

Useful for code generators, ESLint autofixers, and other tooling that needs to turn an arbitrary runtime string into JavaScript source code.

Escapes backslashes, the quote character, and unsafe characters (C0 control characters, DEL, the U+2028/U+2029 line terminators, which can disrupt line-oriented tooling, and lone surrogates, which have no valid UTF-8 representation).

## Install

```sh
npm install quote-js-string
```

## Usage

```js
import quoteJsString from 'quote-js-string';

quoteJsString('It\'s a test');
//=> `'It\\'s a test'`

quoteJsString('It\'s a test', '"');
//=> `"It's a test"`

quoteJsString('line1\nline2');
//=> `'line1\\nline2'`
```

## API

### quoteJsString(string, quote?)

#### string

Type: `string`

The string to quote and escape.

#### quote

Type: `'` | `"`\
Default: `'`

The quote character to wrap the string in.
