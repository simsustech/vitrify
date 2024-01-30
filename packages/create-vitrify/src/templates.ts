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
        test: 'vitrify test',
        lint: 'eslint --ext .vue --ext .ts src',
        'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
        'format:check': 'prettier --check .',
        'format:write': 'prettier --write .'
      },
      dependencies: await getLatestVersions([
        '@fastify/middie',
        '@fastify/static',
        '@quasar/extras',
        'quasar',
        'vite-plugin-pwa',
        'vue',
        'vue-router'
      ]),
      devDependencies: await getLatestVersions([
        '@vitejs/plugin-vue',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@types/node',
        '@vue/reactivity',
        '@vue/runtime-core',
        '@vue/runtime-dom',
        '@vue/server-renderer',
        '@vue/shared',
        'critters',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier-vue',
        'eslint-plugin-vue',
        'devcert',
        'fastify',
        'npm-run-all',
        'typescript',
        'vite',
        'vitrify',
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
  uiPlugin: {
    name: 'vite-ui-plugin',
    fullName: 'Vite UI plugin',
    description: 'A Vite plugin for UI components',
    url: new URL('../templates/vite-ui-plugin/', import.meta.url),
    pkgJson: {
      exports: {
        '.': {
          types: './dist/types/index.d.ts',
          import: './dist/index.js',
          src: './src/ui/index.ts'
        },
        './css': {
          import: './dist/style.css'
        },
        './vite-plugin': {
          types: './dist/vite-plugin.d.ts',
          import: './dist/vite-plugin.js',
          src: './src/vite-plugin.ts'
        }
      },
      scripts: {
        'build:plugin': 'vite build',
        'build:vite-plugin': 'tsc -p tsconfig.build.plugin.json',
        'generate:types': 'vue-tsc -p tsconfig.types.json',
        'clean:buildinfo': 'rimraf tsconfig.build.plugin.tsbuildinfo',
        clean: 'run-s clean:buildinfo',
        build: 'run-s clean build:plugin build:vite-plugin generate:types',
        lint: 'eslint --ext .vue --ext .ts src',
        'lint:fix': 'eslint --ext .vue --ext .ts src --fix',
        'format:check': 'prettier --check .',
        'format:write': 'prettier --write .'
      },
      dependencies: await getLatestVersions(['unplugin-vue-components']),
      devDependencies: await getLatestVersions([
        '@types/node',
        '@types/ws',
        '@vitejs/plugin-vue',
        '@vue/server-renderer',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier-vue',
        'eslint-plugin-vue',
        'npm-run-all',
        'quasar',
        'typescript',
        'rimraf',
        'vite',
        'vitrify',
        'vue',
        'vue-router',
        'vue-tsc'
      ])
    },
    tsconfigJson: {
      types: ['vite/client']
    }
  }
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
