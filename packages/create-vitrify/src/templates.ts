import latestVersion from 'latest-version'

const getLatestVersions = async (dependencies: string[]) => {
  console.log('Fetching latest package versions...')
  const deps: Record<string, string> = {}
  for (const dep of dependencies) {
    deps[dep] = await latestVersion(dep)
  }
  return deps
}

interface Templates {
  [key: string]: {
    name: string
    fullName: string
    description: string
    url: URL
    pkgJson: {
      scripts: Record<string, string>
      exports?: Record<string, { types?: string; import: string; src?: string }>
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
      peerDependencies?: Record<string, string>
    }
    tsconfigJson: {
      paths?: Record<string, string[]>
      types?: string[]
      include?: string[]
    }
  }
}

export const templates: Templates = {
  vue: {
    name: 'vue',
    fullName: 'Vue Project',
    description: 'Plain Vue project',
    url: new URL('../templates/vue/', import.meta.url),
    pkgJson: {
      scripts: {
        dev: 'vitrify dev',
        'dev:ssr': 'vitrify dev -m ssr',
        build: 'run-s build:csr',
        'build:csr': 'vitrify build',
        'build:ssr': 'vitrify build -m ssr',
        'build:ssg': 'vitrify build -m ssg',
        'minify:csr': 'vitrify minify ./dist/csr',
        'minify:ssr:server': 'vitrify minify ./dist/ssr/server',
        'minify:ssr:client': 'vitrify minify ./dist/ssr/client',
        'minify:ssg': 'vitrify minify ./dist/static',
        test: 'vitrify test',
        lint: 'eslint --ext .vue --ext .ts src',
        'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
        'format:check': 'prettier --check .',
        'format:write': 'prettier --write .'
      },
      dependencies: await getLatestVersions([
        '@fastify/middie',
        '@fastify/one-line-logger',
        '@fastify/static'
      ]),
      devDependencies: await getLatestVersions([
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@types/node',
        '@vitejs/plugin-basic-ssl',
        '@vitejs/plugin-vue',
        '@vue/reactivity',
        '@vue/runtime-core',
        '@vue/runtime-dom',
        '@vue/server-renderer',
        '@vue/shared',
        'beasties',
        'devcert',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-vue',
        'fastify',
        'npm-run-all',
        'typescript',
        'typescript-eslint',
        'vite',
        'vite-plugin-pwa',
        'vitrify',
        'vue',
        'vue-eslint-parser',
        'vue-router',
        'workbox-window'
      ]),
      exports: {
        '.': {
          types: './dist/types/index.d.ts',
          import: './dist/index.js'
        },
        './fastify-ssr-plugin': {
          import: './dist/ssr/server/fastify-ssr-plugin.mjs'
        },
        './hooks': {
          import: './dist/ssr/server/virtual_vitrify-hooks.mjs'
        }
      }
    },
    tsconfigJson: {
      paths: {
        src: ['./src']
      },
      types: ['vite/client', 'vitrify/client'],
      include: [
        'vitrify.config.ts',
        'src/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.tsx',
        'src/**/*.vue'
      ]
    }
  },
  quasar: {
    name: 'quasar',
    fullName: 'Quasar Project',
    description: 'Quasar Framework project',
    url: new URL('../templates/quasar/', import.meta.url),
    pkgJson: {
      scripts: {
        dev: 'vitrify dev',
        'dev:ssr': 'vitrify dev -m ssr',
        build: 'run-s build:csr',
        'build:csr': 'vitrify build',
        'build:ssr': 'vitrify build -m ssr',
        'build:ssg': 'vitrify build -m ssg',
        'minify:csr': 'vitrify minify ./dist/csr',
        'minify:ssr:server': 'vitrify minify ./dist/ssr/server',
        'minify:ssr:client': 'vitrify minify ./dist/ssr/client',
        'minify:ssg': 'vitrify minify ./dist/static',
        test: 'vitrify test',
        lint: 'eslint --ext .vue --ext .ts src',
        'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
        'format:check': 'prettier --check .',
        'format:write': 'prettier --write .'
      },
      dependencies: await getLatestVersions([
        '@fastify/middie',
        '@fastify/one-line-logger',
        '@fastify/static'
      ]),
      devDependencies: await getLatestVersions([
        '@quasar/extras',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@types/node',
        '@vitejs/plugin-basic-ssl',
        '@vitejs/plugin-vue',
        '@vue/reactivity',
        '@vue/runtime-core',
        '@vue/runtime-dom',
        '@vue/server-renderer',
        '@vue/shared',
        'beasties',
        'devcert',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-vue',
        'fastify',
        'npm-run-all',
        'quasar',
        'typescript',
        'typescript-eslint',
        'unocss-preset-quasar',
        'vite',
        'vite-plugin-pwa',
        'vitrify',
        'vue',
        'vue-eslint-parser',
        'vue-router',
        'workbox-window'
      ]),
      exports: {
        '.': {
          types: './dist/types/index.d.ts',
          import: './dist/index.js'
        },
        './fastify-ssr-plugin': {
          import: './dist/ssr/server/fastify-ssr-plugin.mjs'
        },
        './hooks': {
          import: './dist/ssr/server/virtual_vitrify-hooks.mjs'
        }
      }
    },
    tsconfigJson: {
      paths: {
        src: ['./src']
      },
      types: ['vite/client', 'vitrify/client'],
      include: [
        'vitrify.config.ts',
        'src/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.tsx',
        'src/**/*.vue'
      ]
    }
  },
  quasarmd3: {
    name: 'quasarmd3',
    fullName: 'Quasar MD3 (alpha)',
    description: 'Quasar Framework Material Design 3 project',
    url: new URL('../templates/quasarmd3/', import.meta.url),
    pkgJson: {
      scripts: {
        dev: 'vitrify dev',
        'dev:ssr': 'vitrify dev -m ssr',
        build: 'run-s build:csr',
        'build:csr': 'vitrify build',
        'build:ssr': 'vitrify build -m ssr',
        'build:ssg': 'vitrify build -m ssg',
        'minify:csr': 'vitrify minify ./dist/csr',
        'minify:ssr:server': 'vitrify minify ./dist/ssr/server',
        'minify:ssr:client': 'vitrify minify ./dist/ssr/client',
        'minify:ssg': 'vitrify minify ./dist/static',
        test: 'vitrify test',
        lint: 'eslint --ext .vue --ext .ts src',
        'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
        'format:check': 'prettier --check .',
        'format:write': 'prettier --write .'
      },
      dependencies: await getLatestVersions([
        '@fastify/middie',
        '@fastify/one-line-logger',
        '@fastify/static'
      ]),
      devDependencies: await getLatestVersions([
        '@iconify-json/mdi',
        '@iconify-json/flagpack',
        '@quasar/extras',
        '@simsustech/quasar-components',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@types/node',
        '@vitejs/plugin-basic-ssl',
        '@vitejs/plugin-vue',
        '@vue/reactivity',
        '@vue/runtime-core',
        '@vue/runtime-dom',
        '@vue/server-renderer',
        '@vue/shared',
        'beasties',
        'devcert',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-vue',
        'fastify',
        'npm-run-all',
        'quasar',
        'typescript',
        'typescript-eslint',
        'unocss-preset-quasar',
        'vite',
        'vite-plugin-pwa',
        'vitrify',
        'vue',
        'vue-eslint-parser',
        'vue-router',
        'workbox-window'
      ]),
      exports: {
        '.': {
          types: './dist/types/index.d.ts',
          import: './dist/index.js'
        },
        './fastify-ssr-plugin': {
          import: './dist/ssr/server/fastify-ssr-plugin.mjs'
        },
        './hooks': {
          import: './dist/ssr/server/virtual_vitrify-hooks.mjs'
        }
      }
    },
    tsconfigJson: {
      paths: {
        src: ['./src']
      },
      types: ['vite/client', 'vitrify/client'],
      include: [
        'vitrify.config.ts',
        'src/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.tsx',
        'src/**/*.vue'
      ]
    }
  },
  fastify: {
    name: 'fastify',
    fullName: 'Fastify server',
    description: 'Fastify server with HMR',
    url: new URL('../templates/fastify/', import.meta.url),
    pkgJson: {
      scripts: {
        dev: 'vitrify dev -m fastify',
        'dev:ssr': 'vitrify dev -m fastify',
        build: 'vitrify build -m fastify',
        minify: 'vitrify minify ./dist/server',
        test: 'vitrify test',
        lint: 'eslint --ext .vue --ext .ts src',
        'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
        'format:check': 'prettier --check .',
        'format:write': 'prettier --write .'
      },
      dependencies: await getLatestVersions([
        '@fastify/middie',
        '@fastify/one-line-logger',
        '@fastify/static'
      ]),
      devDependencies: await getLatestVersions([
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@types/node',
        '@vitejs/plugin-basic-ssl',
        'devcert',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-vue',
        'fastify',
        'npm-run-all',
        'typescript',
        'typescript-eslint',
        'vite',
        'vitrify'
      ]),
      exports: {
        '.': {
          types: './dist/types/index.d.ts',
          import: './dist/index.js'
        }
      }
    },
    tsconfigJson: {
      paths: {
        src: ['./src']
      },
      types: ['vite/client', 'vitrify/client'],
      include: [
        'vitrify.config.ts',
        'src/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.tsx',
        'src/**/*.vue'
      ]
    }
  }
  // uiPlugin: {
  //   name: 'vite-ui-plugin',
  //   fullName: 'Vite UI plugin',
  //   description: 'A Vite plugin for UI components',
  //   url: new URL('../templates/vite-ui-plugin/', import.meta.url),
  //   pkgJson: {
  //     exports: {
  //       '.': {
  //         types: './dist/types/index.d.ts',
  //         import: './dist/index.js',
  //         src: './src/ui/index.ts'
  //       },
  //       './css': {
  //         import: './dist/style.css'
  //       },
  //       './vite-plugin': {
  //         types: './dist/vite-plugin.d.ts',
  //         import: './dist/vite-plugin.js',
  //         src: './src/vite-plugin.ts'
  //       }
  //     },
  //     scripts: {
  //       'build:plugin': 'vite build',
  //       'build:vite-plugin': 'tsc -p tsconfig.build.plugin.json',
  //       'generate:types': 'vue-tsc -p tsconfig.types.json',
  //       'clean:buildinfo': 'rimraf tsconfig.build.plugin.tsbuildinfo',
  //       clean: 'run-s clean:buildinfo',
  //       build: 'run-s clean build:plugin build:vite-plugin generate:types',
  //       lint: 'eslint --ext .vue --ext .ts src',
  //       'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
  //       'format:check': 'prettier --check .',
  //       'format:write': 'prettier --write .'
  //     },
  //     dependencies: await getLatestVersions(['unplugin-vue-components']),
  //     devDependencies: await getLatestVersions([
  //       '@types/node',
  //       '@types/ws',
  //       '@vitejs/plugin-vue',
  //       '@vue/server-renderer',
  //       '@typescript-eslint/eslint-plugin',
  //       '@typescript-eslint/parser',
  //       'eslint',
  //       'eslint-config-prettier',
  //       'eslint-plugin-prettier-vue',
  //       'eslint-plugin-vue',
  //       'npm-run-all',
  //       'quasar',
  //       'typescript',
  //       'rimraf',
  //       'vite',
  //       'vitrify',
  //       'vue',
  //       'vue-router',
  //       'vue-tsc'
  //     ])
  //   },
  //   tsconfigJson: {
  //     types: ['vite/client']
  //   }
  // }
  // plugin: {
  //   name: 'quasar-plugin',
  //   fullName: 'Quasar Plugin',
  //   description: 'Quasar Framework plugin',
  //   url: new URL('../templates/quasar-plugin/', import.meta.url)
  // },
  // quasarMonorepo: {
  //   name: 'quasar-monorepo',
  //   fullName: 'Quasar monorepo (project + plugin)',
  //   description: 'Quasar Framework monorepo',
  //   url: new URL('../templates/quasar-monorepo/', import.meta.url)
  // }
}
