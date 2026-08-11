import semver from 'semver';
import { firstFromStream } from '@simple-libs/stream-utils';
import { isPrereleaseVersion } from './utils.js';
import { GitClient } from './GitClient.js';
/**
 * Helper to get package tag prefix.
 * @param packageName
 * @returns Tag prefix.
 */
export function packagePrefix(packageName) {
    if (!packageName) {
        return /^.+@/;
    }
    return `${packageName}@`;
}
/**
 * Wrapper around Git CLI with conventional commits support.
 */
export class ConventionalGitClient extends GitClient {
    deps = null;
    loadDeps() {
        if (this.deps) {
            return this.deps;
        }
        this.deps = Promise.all([
            import('conventional-commits-parser')
                .then(({ parseCommits }) => parseCommits),
            import('conventional-commits-filter')
                .then(({ filterRevertedCommits }) => filterRevertedCommits)
        ]);
        return this.deps;
    }
    /**
     * Get parsed commits stream.
     * @param params
     * @param params.path - Read commits from specific path.
     * @param params.from - Start commits range.
     * @param params.to - End commits range.
     * @param params.format - Commits format.
     * @param parserOptions - Commit parser options.
     * @yields Raw commits data.
     */
    async *getCommits(params = {}, parserOptions = {}) {
        const { filterReverts, ...gitLogParams } = params;
        const [parseCommits, filterRevertedCommits] = await this.loadDeps();
        if (filterReverts) {
            yield* filterRevertedCommits(this.getCommits(gitLogParams, parserOptions));
            return;
        }
        const parse = parseCommits(parserOptions);
        const commitsStream = this.getRawCommits(gitLogParams);
        yield* parse(commitsStream);
    }
    /**
     * Get semver tags stream.
     * @param params
     * @param params.prefix - Get semver tags with specific prefix.
     * @param params.skipUnstable - Skip semver tags with unstable versions.
     * @param params.clean - Clean version from prefix and trash.
     * @param params.path - Read tags from specific path.
     * @param params.from - Start tags range.
     * @param params.to - End tags range.
     * @param params.since - Get tags since specific date.
     * @yields Semver tags.
     */
    async *getSemverTags(params = {}) {
        const { prefix, skipUnstable, clean, ...getTagsParams } = params;
        const tagsStream = this.getTags(getTagsParams);
        const cleanTag = clean
            ? (tag, unprefixed) => semver.clean(unprefixed || tag)
            : (tag) => tag;
        let unprefixed;
        let tag;
        for await (tag of tagsStream) {
            if (prefix) {
                const isPrefixed = typeof prefix === 'string'
                    ? tag.startsWith(prefix)
                    : prefix.test(tag);
                if (isPrefixed) {
                    unprefixed = tag.replace(prefix, '');
                    if (semver.valid(unprefixed) && !(skipUnstable && isPrereleaseVersion(unprefixed))) {
                        tag = cleanTag(tag, unprefixed);
                        if (tag) {
                            yield tag;
                        }
                    }
                }
            }
            else if (semver.valid(tag) && !(skipUnstable && isPrereleaseVersion(tag))) {
                tag = cleanTag(tag);
                if (tag) {
                    yield tag;
                }
            }
        }
    }
    /**
     * Get last semver tag.
     * @param params - getSemverTags params.
     * @returns Last semver tag, `null` if not found.
     */
    async getLastSemverTag(params = {}) {
        return firstFromStream(this.getSemverTags(params));
    }
    /**
     * Get current sematic version from git tags.
     * @param params - Additional git params.
     * @returns Current sematic version, `null` if not found.
     */
    async getVersionFromTags(params = {}) {
        const semverTagsStream = this.getSemverTags({
            clean: true,
            ...params
        });
        const semverTags = [];
        for await (const tag of semverTagsStream) {
            semverTags.push(tag);
        }
        if (!semverTags.length) {
            return null;
        }
        return semverTags.sort(semver.rcompare)[0] || null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVudGlvbmFsR2l0Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbnZlbnRpb25hbEdpdENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBSzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFMUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsV0FBb0I7SUFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQztJQUVELE9BQU8sR0FBRyxXQUFXLEdBQUcsQ0FBQTtBQUMxQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsU0FBUztJQUMxQyxJQUFJLEdBQXdFLElBQUksQ0FBQTtJQUVoRixRQUFRO1FBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDbEIsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN0QixNQUFNLENBQUMsNkJBQTZCLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUMzQyxNQUFNLENBQUMsNkJBQTZCLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxDQUFDLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDOUQsQ0FBQyxDQUFBO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7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