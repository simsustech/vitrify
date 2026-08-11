const CHARACTER_ESCAPES = {
	'\n': String.raw`\n`,
	'\r': String.raw`\r`,
	'\t': String.raw`\t`,
	'\b': String.raw`\b`,
	'\f': String.raw`\f`,
	'\v': String.raw`\v`,
	'\0': String.raw`\u{0}`,
};

function isUnsafeCharacter(codePoint) {
	return codePoint <= 0x1F // C0 control characters.
		|| codePoint === 0x7F // DEL.
		// U+2028/U+2029 are legal raw in string literals since ES2019, but they're real Unicode line/paragraph
		// separators, so editors, diffs, and other line-based tooling would still render the literal as broken
		// across lines.
		|| codePoint === 0x20_28
		|| codePoint === 0x20_29
		// A lone (unpaired) surrogate has no valid UTF-8 representation, so writing it raw into a source file
		// can corrupt it on save.
		|| (codePoint >= 0xD8_00 && codePoint <= 0xDF_FF);
}

export default function quoteJsString(string, quote = '\'') {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string.');
	}

	if (quote !== '\'' && quote !== '"') {
		throw new TypeError('Expected `quote` to be either `\'` or `"`.');
	}

	const escaped = [...string].map(character => {
		if (character === '\\') {
			return String.raw`\\`;
		}

		if (character === quote) {
			return `\\${quote}`;
		}

		const codePoint = character.codePointAt(0);
		if (isUnsafeCharacter(codePoint)) {
			return CHARACTER_ESCAPES[character] ?? String.raw`\u{${codePoint.toString(16)}}`;
		}

		return character;
	}).join('');

	return `${quote}${escaped}${quote}`;
}
