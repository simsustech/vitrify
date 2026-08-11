const nomatchRegex = /(?!.*)/;
function escape(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function joinOr(parts) {
    return parts
        .map(val => (typeof val === 'string' ? escape(val.trim()) : val.source))
        .filter(Boolean)
        .join('|');
}
function getNotesRegex(noteKeywords, notesPattern) {
    if (!noteKeywords) {
        return nomatchRegex;
    }
    const noteKeywordsSelection = joinOr(noteKeywords);
    if (!notesPattern) {
        return new RegExp(`^(?:\\*\\s+)?(${noteKeywordsSelection}):\\s*(.*)`, 'i');
    }
    return notesPattern(noteKeywordsSelection);
}
function getReferencePartsRegex(issuePrefixes, issuePrefixesCaseSensitive) {
    if (!issuePrefixes) {
        return nomatchRegex;
    }
    const flags = issuePrefixesCaseSensitive ? 'g' : 'gi';
    return new RegExp(`(?:.*?)??\\s*([\\w-\\.\\/]*?)??(${joinOr(issuePrefixes)})([\\w-]+)(?=\\s|$|[,;.)\\]])`, flags);
}
function getReferencesRegex(referenceActions) {
    if (!referenceActions) {
        // matches everything
        return /()(.+)/gi;
    }
    const joinedKeywords = joinOr(referenceActions);
    return new RegExp(`(${joinedKeywords})(?:\\s+(.*?))(?=(?:${joinedKeywords})|$)`, 'gi');
}
function getFooterTokenRegex(issuePrefixes) {
    const issuePrefixSeparator = issuePrefixes
        ? `|\\s+(?:${joinOr(issuePrefixes)})`
        : '';
    // Footers follow the git trailer convention: the token starts at the
    // beginning of the line, indented `key: value` lines are not footers.
    return new RegExp(`^(?:BREAKING CHANGE|[\\w-]+)(?::\\s+${issuePrefixSeparator}).+`, 'i');
}
/**
 * Make the regexes used to parse a commit.
 * @param options
 * @returns Regexes.
 */
export function getParserRegexes(options = {}) {
    const notes = getNotesRegex(options.noteKeywords, options.notesPattern);
    const referenceParts = getReferencePartsRegex(options.issuePrefixes, options.issuePrefixesCaseSensitive);
    const references = getReferencesRegex(options.referenceActions);
    const footerToken = getFooterTokenRegex(options.issuePrefixes);
    return {
        notes,
        referenceParts,
        references,
        footerToken,
        mentions: /@([\w-]+)/g,
        url: /\b(?:https?):\/\/(?:www\.)?([-a-zA-Z0-9@:%_+.~#?&//=])+\b/
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVnZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFBO0FBRTdCLFNBQVMsTUFBTSxDQUFDLE1BQWM7SUFDNUIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3RELENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxLQUEwQjtJQUN4QyxPQUFPLEtBQUs7U0FDVCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNkLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FDcEIsWUFBNkMsRUFDN0MsWUFBb0Q7SUFFcEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xCLE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVsRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIscUJBQXFCLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM1RSxDQUFDO0lBRUQsT0FBTyxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBRUQsU0FBUyxzQkFBc0IsQ0FDN0IsYUFBOEMsRUFDOUMsMEJBQStDO0lBRS9DLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQixPQUFPLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBRXJELE9BQU8sSUFBSSxNQUFNLENBQUMsbUNBQW1DLE1BQU0sQ0FBQyxhQUFhLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDbkgsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQ3pCLGdCQUFpRDtJQUVqRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QixxQkFBcUI7UUFDckIsT0FBTyxVQUFVLENBQUE7SUFDbkIsQ0FBQztJQUVELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRS9DLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxjQUFjLHVCQUF1QixjQUFjLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN4RixDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FDMUIsYUFBOEM7SUFFOUMsTUFBTSxvQkFBb0IsR0FBRyxhQUFhO1FBQ3hDLENBQUMsQ0FBQyxXQUFXLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRztRQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRU4scUVBQXFFO0lBQ3JFLHNFQUFzRTtJQUN0RSxPQUFPLElBQUksTUFBTSxDQUFDLHVDQUF1QyxvQkFBb0IsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQzFGLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixPQUFPLEdBQStILEVBQUU7SUFFeEksTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sY0FBYyxHQUFHLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDeEcsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDL0QsTUFBTSxXQUFXLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRTlELE9BQU87UUFDTCxLQUFLO1FBQ0wsY0FBYztRQUNkLFVBQVU7UUFDVixXQUFXO1FBQ1gsUUFBUSxFQUFFLFlBQVk7UUFDdEIsR0FBRyxFQUFFLDJEQUEyRDtLQUNqRSxDQUFBO0FBQ0gsQ0FBQyJ9