import Handlebars from 'handlebars'

/**
 * https://github.com/cameronhunter/prettier-package-json/blob/HEAD/src/defaultOptions.ts
 */
const PKG_JSON_TEMPLATE = Handlebars.compile(`{
  {{#if private}}
  "private": true,
  {{/if}}
  "name": "{{ name }}",
  "productName": "{{ productName }}",
  "version": "{{ version }}",
  "description": "{{ description }}",
  "license": "{{ license }}",
  "author": "{{ author }}",
  "type": "module",
  "exports": {
    {{#if exports}}
    {{#each exports}}
    "{{@key}}": {
      {{#each this}}
      "{{@key}}": "{{this}}"{{#unless @last}},{{/unless}}
      {{/each}}
    }{{#unless @last}},{{/unless}}
    {{/each}}
    {{else}}
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js"
    }
    {{/if}}
  },
  "files": [
    "dist/"
  ],
  "scripts": {
  {{#each scripts}}
  {{#if @last}}
    "{{@key}}": "{{this}}"
  {{else}}
    "{{@key}}": "{{this}}",
  {{/if}}
  {{/each}}
  },
  "dependencies": {
  {{#each dependencies}}
  {{#if @last}}
    "{{@key}}": "{{this}}"
  {{else}}
    "{{@key}}": "{{this}}",
  {{/if}}
  {{/each}}
  },
  "devDependencies": {
  {{#each devDependencies}}
  {{#if @last}}
    "{{@key}}": "{{this}}"
  {{else}}
    "{{@key}}": "{{this}}",
  {{/if}}
  {{/each}}
  },
  "peerDependencies": {
  {{#each peerDependencies}}
  {{#if @last}}
    "{{@key}}": "{{this}}"
  {{else}}
    "{{@key}}": "{{this}}",
  {{/if}}
  {{/each}}
  }
}`)

export const renderDependencies = (dependencies?: Record<string, string>) => {
  if (dependencies)
    return `${Object.entries(dependencies)
      .map(([pkg, version]) => `> "${pkg}": "${version}"`)
      .join(',\n')}`
}

export const renderPackageJson = ({
  privatePkg,
  name,
  productName,
  version,
  description,
  license,
  author,
  exports,
  dependencies,
  devDependencies,
  peerDependencies,
  scripts
}: {
  privatePkg?: boolean
  name: string
  productName: string
  version: string
  description: string
  license: string
  author: string
  exports?: Record<string, Record<string, string>>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  scripts: Record<string, string>
}) => {
  return PKG_JSON_TEMPLATE({
    private: privatePkg,
    name,
    productName,
    version,
    description,
    license,
    author,
    exports,
    dependencies,
    devDependencies,
    peerDependencies,
    scripts
  })
}
