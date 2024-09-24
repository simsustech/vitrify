#!/usr/bin/env node
import {
  renderDirectory,
  renderPackageJson,
  renderTsconfigJson
} from '@vitrify/tools/render'
import parseArgs from 'minimist'
import { input, rawlist } from '@inquirer/prompts'
import inquirer from 'inquirer'
import { promises } from 'fs'
import { templates } from './templates.js'
const escape = (val: any) => JSON.stringify(val).slice(1, -1)

const argv = parseArgs(process.argv.slice(2), {
  string: ['template']
})

let templateName = argv.template
if (!argv.template) {
  templateName = await rawlist({
    message: 'Which template would you like to use?',
    choices: Object.entries(templates).map(([key, value]) => ({
      name: value.fullName,
      value: key,
      short: value.description
    }))
  })
}

const name = await input({
  message: 'Package name',
  validate: (val: string) => val && val.length > 0,
  default: argv._[0]
})

let productName = 'App'
if (templateName !== 'plugin') {
  productName = await input({
    message: 'Project product name',
    default: 'App',

    validate: (val: string) => val && val.length > 0,
    transformer: escape
  })
}

const description = await input({
  message: 'Project description',
  default: 'A Vitrify app',
  transformer: escape
})

const author = await input({
  message: 'Author'
})

interface TemplateVariables {
  template: string
  name: string
  productName: string
  description: string
  author: string
}
const cwdUrl = new URL('', `file://${process.cwd()}/`)
const templateVariables = {
  template: templateName,
  name,
  productName,
  description,
  author
} as TemplateVariables
// @ts-ignore
const template = templates[templateName]

const directoryUrl = template.url
const outputDir = new URL(`./${name}/`, cwdUrl)

await renderDirectory({
  directoryUrl,
  templateVariables,
  outputDir
})

promises.writeFile(
  new URL('./package.json', outputDir),
  renderPackageJson({
    ...templateVariables,
    version: '0.1.0',
    license: 'UNLICENSED',
    ...template.pkgJson
  })
)
promises.writeFile(
  new URL('./tsconfig.json', outputDir),
  renderTsconfigJson(template.tsconfigJson)
)
