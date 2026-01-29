import { promises as fs } from 'fs'
import readline from 'readline'
import { getAppDir, getCliDir, getProjectURLs } from '../app-urls.js'
import { fileURLToPath } from 'url'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export interface VitrifyContext {
  vitrify: {
    version: string
  }
  projectURLs: ReturnType<typeof getProjectURLs>
}

export async function run(filePath: string) {
  const { run } = await import(filePath)
  const appDir = getAppDir()
  const cliDir = getCliDir()
  const projectURLs = getProjectURLs(appDir, cliDir)
  const pkg = JSON.parse(
    (await fs.readFile(fileURLToPath(projectURLs.cli('package.json')), 'utf-8')).toString()
  )

  if (!run)
    throw new Error(
      `${filePath} does not have an export named run. Aborting...`
    )

  rl.question(
    `
The script ${filePath}
will now be executed by vitrify.
Make sure you trust the content of this script before proceeding.
Press enter to proceed or CTRL+C to abort.`,
    async (answer) => {
      await run({
        vitrify: {
          version: pkg.version
        },
        resolve: projectURLs
      })
      rl.close()
    }
  )
}
