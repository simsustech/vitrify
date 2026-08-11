#!/usr/bin/env node

const {checkSimpleGitHooksInDependencies, getProjectRootDirectoryFromNodeModules, setHooksFromConfig, skipInstall} = require("./simple-git-hooks")
async function postinstall() {
    if(skipInstall()) {
        return
    }
    let projectDirectory
    const parsedProjectDirectory = getProjectRootDirectoryFromNodeModules(process.cwd())
    if (parsedProjectDirectory !== undefined) {
        projectDirectory = parsedProjectDirectory
    } else {
        projectDirectory = process.cwd()
    }
    if (checkSimpleGitHooksInDependencies(projectDirectory)) {
        try {
            await setHooksFromConfig(projectDirectory)
        } catch (err) {
            console.log('[ERROR] Was not able to set git hooks. Reason: ' + err)
        }
    }
}
postinstall()
