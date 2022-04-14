import { projectURLs } from '../app-urls.js'
import { promises as fs } from 'fs'
import readline from 'readline'
const pkg = JSON.parse(
  (await fs.readFile(projectURLs.cli('package.json'), 'utf-8')).toString()
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export interface VitrifyContext {
  vitrify: {
    version: string
  }
  projectURLs: typeof projectURLs
}

export async function run(filePath: string) {
  const { run } = await import(filePath)

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
