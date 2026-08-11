import semver from 'semver';
/**
 * Format arguments.
 * @param args
 * @returns Formatted arguments.
 */
export function formatArgs(...args) {
    return args.reduce((finalArgs, arg) => {
        if (arg) {
            finalArgs.push(String(arg));
        }
        return finalArgs;
    }, []);
}
/**
 * Convert value to array.
 * @param value
 * @returns Array.
 */
export function toArray(value) {
    return Array.isArray(value) ? value : [value];
}
/**
 * Check if version is a prerelease, e.g. 1.0.0-alpha.1, 1.0.0-rc.2.
 * @param version
 * @returns True if version is a prerelease.
 */
export function isPrereleaseVersion(version) {
    return semver.prerelease(version) !== null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBRzNCOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQUcsSUFBVztJQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNSLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLE9BQU8sQ0FBSSxLQUFjO0lBQ3ZDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQy9DLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE9BQWU7SUFDakQsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQTtBQUM1QyxDQUFDIn0=