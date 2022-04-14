import { renderTemplate } from './index.js'
import parseArgs from 'minimist'
import type { QuestionCollection } from 'inquirer'
import inquirer from 'inquirer'
import { promises } from 'fs'
import { templates } from './templates.js'
const escape = (val: any) => JSON.stringify(val).slice(1, -1)

// const templates = (await promises.readdir(new URL('../templates/', import.meta.url), { withFileTypes: true }))
//   .filter((file) => file.isDirectory())
//   .map((file) => file.name)

const argv = parseArgs(process.argv.slice(2), {
  string: ['template']
})

let questions: QuestionCollection[] = []
if (!argv.template) {
  // throw new Error('Please provide a template argument: --template')
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

const cwdUrl = new URL('', `file://${process.cwd()}/`)
const templateVariables = answers
const templateUrl =
  // @ts-ignore
  templates[answers.template].url || templates[argv.template].url
renderTemplate({
  templateUrl,
  templateVariables,
  outputDir: new URL(`./${answers.name}/`, cwdUrl)
})
