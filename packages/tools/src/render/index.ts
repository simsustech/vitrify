import Handlebars from 'handlebars'
import { existsSync, promises } from 'fs'

export { renderPackageJson } from './packageJson.js'
export { renderTsconfigJson } from './tsconfigJson.js'

export const renderAll = async ({
  inputPath,
  outputPath,
  templateVariables,
  exclude
}: {
  inputPath: URL
  outputPath: URL
  templateVariables: Record<string, any>
  exclude?: string[]
}) => {
  if (!existsSync(outputPath)) {
    await promises.mkdir(outputPath)
  }
  const content = await promises.readdir(inputPath, { withFileTypes: true })
  const files = content
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name)
  const directories = content
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (let file of files) {
    const fileInputPath = new URL(`./${file}`, inputPath)
    if (file.startsWith('_')) file = file.replace('_', '.')
    const fileOutputPath = new URL(file.replace('.hbs', ''), outputPath)
    if (file.endsWith('.hbs')) {
      await render({
        inputPath: fileInputPath,
        outputPath: new URL(file.replace('.hbs', ''), outputPath),
        templateVariables
      })
    } else {
      await promises.copyFile(fileInputPath, fileOutputPath)
    }
  }

  let p: Promise<unknown>[] = []
  for (const directory of directories) {
    p.push(
      renderAll({
        inputPath: new URL(`./${directory}/`, inputPath),
        outputPath: new URL(`./${directory}/`, outputPath),
        templateVariables
      })
    )
  }
  return Promise.all(p)
}

export const render = async ({
  inputPath,
  outputPath,
  templateVariables
}: {
  inputPath: URL
  outputPath: URL
  templateVariables: Record<string, any>
}) => {
  const outputFolder = new URL('./', outputPath)
  if (!existsSync(outputFolder)) {
    await promises.mkdir(outputFolder)
  }
  const fileContent = await promises.readFile(new URL(inputPath), 'utf-8')
  const template = Handlebars.compile(fileContent)
  const compiled = template(templateVariables)
  return promises.writeFile(outputPath, compiled, 'utf-8')
}

export const renderDirectory = async ({
  directoryUrl,
  templateVariables,
  outputDir
}: {
  directoryUrl: URL
  templateVariables: Record<string, any>
  outputDir: URL
}) => {
  if (outputDir.pathname[outputDir.pathname.length - 1] !== '/') {
    throw new Error(
      'outputDir is not a directory. Make sure the URL ends with a /'
    )
  }

  return renderAll({
    inputPath: new URL(`./`, directoryUrl),
    outputPath: new URL(`./`, outputDir),
    templateVariables
  })
}
