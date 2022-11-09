import { renderPackageJson, renderTsconfigJson } from '../src/render/index.js'

console.log(
  renderPackageJson({
    name: 'test',
    productName: 'Test product',
    version: '0.1.0',
    description: 'Test',
    license: 'MIT',
    author: 'yo',
    dependencies: {
      vite: '^3.0.0',
      typescript: '^4.8.2'
    },
    scripts: {
      build: 'tsc'
    }
  })
)

console.log(
  renderTsconfigJson({
    // types: ['yo'],
    // include: ['no']
  })
)
