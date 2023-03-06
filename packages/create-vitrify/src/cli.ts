#!/usr/bin/env node
import {
  renderDirectory,
  renderPackageJson,
  renderTsconfigJson
} from '@vitrify/tools/render'
import parseArgs from 'minimist'
import type { QuestionCollection } from 'inquirer'
import inquirer from 'inquirer'
import { promises } from 'fs'
import { templates } from './templates.js'
const escape = (val: any) => JSON.stringify(val).slice(1, -1)

const argv = parseArgs(process.argv.slice(2), {
  string: ['template']
})

let questions: QuestionCollection[] = []
if (!argv.template) {
  questions = [
    ...questions,
    {
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: Object.entries(templates).map(([key, value]) => ({
        name: value.fullName,
        value: key,
        short: value.description
      }))
    }
  ]
}

questions = [
  ...questions,
  {
    type: 'input',
    name: 'name',
    message: 'Package name',
    validate: (val: string) => val && val.length > 0,
    default: (answers: Record<string, any>) => {
      return argv._[0]
    }
  },
  {
    type: 'input',
    name: 'productName',
    message: 'Project product name',
    default: 'App',
    when: (answers) => {
      return answers.template !== 'plugin'
    },
    validate: (val: string) => val && val.length > 0,
    transformer: escape
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'A Vitrify app',
    transformer: escape
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author'
  }
]
const answers = await inquirer.prompt(questions)

interface TemplateVariables {
  template: string
  name: string
  productName: string
  description: string
  author: string
}
const cwdUrl = new URL('', `file://${process.cwd()}/`)
const templateVariables = answers as TemplateVariables
// @ts-ignore
const template = templates[answers.template] || templates[argv.template]

const directoryUrl = template.url
const outputDir = new URL(`./${answers.name}/`, cwdUrl)

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
