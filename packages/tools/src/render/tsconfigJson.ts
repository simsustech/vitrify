import Handlebars from 'handlebars'

const TSCONFIG_JSON_TEMPLATE = Handlebars.compile(`{
  "compilerOptions": {
    "target": "esnext",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "module": "esnext",
    "moduleResolution": "nodenext",
    "baseUrl": "./",
    "types": [{{#each types}}
      {{#if @last}}
        "{{this}}"
      {{else}}
        "{{this}}",
      {{/if}}
      {{/each}}
    ],
    "declaration": true,
    "outDir": "./dist",
    "declarationDir": "./dist/types",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "paths": {
    {{#each paths}}
      "{{@key}}": [{{#each this}}"{{this}}"{{#unless @last}},{{/unless}}{{/each}}]{{#unless @last}},{{/unless}}
    {{/each}}
    }
  },
  {{#if include}}
  "include": [
    {{#each include}}
    "{{this}}"{{#unless @last}},{{/unless}}
    {{/each}}
  ]
  {{/if}}
}
`)

export const renderTsconfigJson = ({
  types,
  include,
  paths
}: {
  types?: string[]
  include?: string[]
  paths?: Record<string, string[]>
}) => {
  return TSCONFIG_JSON_TEMPLATE({
    types,
    include,
    paths
  })
}
