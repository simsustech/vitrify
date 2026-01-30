import vuePlugin from '@vitejs/plugin-vue'
import type {
  Alias,
  InlineConfig,
  Plugin,
  UserConfig as ViteUserConfig
} from 'vite'
import { findDepPkgJsonPath } from 'vitefu'
import { mergeConfig } from 'vite'
import { build } from 'esbuild'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { readFileSync } from 'fs'
import { builtinModules } from 'node:module'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import type {
  StaticImports,
  OnAppMountedHook,
  VitrifyConfig,
  VitrifyConfigAsync,
  VitrifyCommands,
  VitrifyModes,
  VitrifyUIFrameworks,
  VitrifySSRModes,
  OnAppRenderedHook,
  OnSetupHookFile,
  OnAppCreatedHook,
  OnTemplateRenderedHook,
  OnAppCreatedHookFile,
  OnAppRenderedHookFile,
  OnTemplateRenderedHookFile,
  OnAppMountedHookFile
} from './vitrify-config.js'
import type { VitrifyContext } from './bin/run.js'
import type { VitrifyPlugin } from './plugins/index.js'
import { resolve } from './app-urls.js'
import type { ManualChunksOption, RollupOptions } from 'rollup'
import { addOrReplaceTitle, appendToBody } from './helpers/utils.js'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import { searchForWorkspaceRoot } from 'vite'

const internalServerModules = [
  'util',
  'vitrify',
  'vitrify/dev',
  'vite',
  'fastify',
  '@fastify/static',
  '@fastify/middie',
  '@fastify',
  'node',
  'beasties',
  'node-fetch',
  'ws',
  'abort-controller'
]

const manualChunkNames = [
  'prerender',
  'fastify-ssr-plugin',
  'fastify-csr-plugin',
  'server'
]

const moduleChunks = {
  vue: [
    'vue',
    '@vue',
    'vue-router',
    'pinia',
    '@pinia/colada',
    '@vue/devtools-api',
    '@vueuse/core',
    '@vueuse/metadata',
    '@vueuse/shared'
  ],
  quasar: ['quasar'],
  atQuasar: ['@quasar']
}
const manualChunksFn = (manualChunkList?: string[]): ManualChunksOption => {
  return (id: string) => {
    const matchedModule = Object.entries(moduleChunks).find(
      ([chunkName, moduleNames]) =>
        moduleNames.some((moduleName) =>
          new RegExp(`\/${moduleName}\/`).test(id)
        )
    )
    if (id.includes('vitrify/src/')) {
      const name = id.split('/').at(-1)?.split('.').at(0)
      if (name && manualChunkNames.includes(name)) return name
    } else if (
      VIRTUAL_MODULES.some((virtualModule) => id.includes(virtualModule))
    ) {
      return VIRTUAL_MODULES.find((name) => id.includes(name))
    } else if (manualChunkList?.some((file) => id.includes(file))) {
      return manualChunkList.find((file) => id.includes(file))
    } else if (id.includes('node_modules')) {
      if (matchedModule) {
        return matchedModule[0]
      }
      return 'vendor'
    }
  }
}

export const VIRTUAL_MODULES = [
  'virtual:vitrify-hooks',
  'virtual:static-imports',
  'virtual:vitrify-config',
  'vitrify.sass',
  'vitrify.css'
]

async function bundleConfigFile(
  fileName: string,
  isESM = false
): Promise<{ code: string; dependencies: string[] }> {
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: 'esm',
    sourcemap: 'inline',
    metafile: true,
    plugins: [
      {
        name: 'externalize-deps',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            const id = args.path
            if (id[0] !== '.' && !path.isAbsolute(id)) {
              return {
                external: true
              }
            }
          })
        }
      },
      {
        name: 'replace-import-meta',
        setup(build) {
          build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8')
            return {
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
              contents: contents
                .replace(
                  /\bimport\.meta\.url\b/g,
                  JSON.stringify(pathToFileURL(args.path).href)
                )
                .replace(
                  /\b__dirname\b/g,
                  JSON.stringify(path.dirname(args.path))
                )
                .replace(/\b__filename\b/g, JSON.stringify(args.path))
            }
          })
        }
      }
    ]
  })
  const { text } = result.outputFiles[0]
  return {
    code: text,
    dependencies: result.metafile ? Object.keys(result.metafile.inputs) : []
  }
}

export const baseConfig = async ({
  ssr,
  appDir,
  publicDir,
  base = '/',
  command = 'build',
  mode = 'production',
  framework = 'vue',
  debug = false,
  productName
}: {
  ssr?: VitrifySSRModes
  appDir?: URL
  publicDir?: URL
  base?: string
  command?: VitrifyCommands
  mode?: VitrifyModes
  framework?: VitrifyUIFrameworks
  debug?: boolean
  productName?: string
}): Promise<InlineConfig> => {
  const { getAppDir, getCliDir, getCliViteDir, getSrcDir, getCwd } =
    await import('./app-urls.js')
  if (!appDir) {
    appDir = getAppDir()
  }
  const srcDir = getSrcDir(appDir)
  const cwd = getCwd()
  const cliDir = getCliDir()
  const cliViteDir = getCliViteDir(cliDir)
  const frameworkDir = new URL(`${framework}/`, cliViteDir)
  const fastifyDir = new URL('fastify/', cliViteDir)

  if (!publicDir) publicDir = new URL('public/', appDir)

  let rawVitrifyConfig: VitrifyConfig | VitrifyConfigAsync
  let vitrifyConfig: VitrifyConfig

  try {
    if (fs.existsSync(fileURLToPath(new URL('vitrify.config.ts', appDir)))) {
      const configPath = fileURLToPath(new URL('vitrify.config.ts', appDir))
      const bundledConfig = await bundleConfigFile(
        fileURLToPath(new URL('vitrify.config.ts', appDir))
      )
      fs.writeFileSync(configPath + '.js', bundledConfig.code)

      rawVitrifyConfig = (await import('file://' + configPath + '.js')).default
      fs.unlinkSync(configPath + '.js')
    } else {
      rawVitrifyConfig = (
        await import(new URL('vitrify.config.js', appDir).href)
      ).default
    }
    if (typeof rawVitrifyConfig === 'function') {
      vitrifyConfig = await rawVitrifyConfig({ mode, command })
    } else {
      vitrifyConfig = rawVitrifyConfig
    }
  } catch (e) {
    console.log('No valid vitrify.config.(ts|js) file found.')
    throw e
  }

  const localPackages = []
  if (framework === 'vue')
    localPackages.push('vue', 'vue-router', '@vue/server-renderer')

  const cliPackages: string[] = []
  const packageUrls: Record<string, URL> =
    vitrifyConfig.vitrify?.urls?.packages || {}
  await (async () => {
    for (const val of localPackages) {
      const pkgDir = await findDepPkgJsonPath(val, fileURLToPath(appDir))
      if (pkgDir) packageUrls![val] = new URL(`file://${pkgDir}`)
    }
  })()
  if (!productName) {
    try {
      ;({ productName } = JSON.parse(
        readFileSync(fileURLToPath(new URL('package.json', appDir)), {
          encoding: 'utf-8'
        })
      ))
      if (!productName) productName = vitrifyConfig.vitrify?.productName
    } catch (e) {
      console.error('package.json not found')
      productName = 'Product name'
    }
  } else {
  }

  const isPwa = !!vitrifyConfig.vitrify?.pwa || false

  const frameworkPlugins: Plugin[] = []
  if (framework === 'vue') {
    frameworkPlugins.push(vuePlugin())
  }

  const vitrifyPlugins: Plugin[] = []
  if (vitrifyConfig.vitrify?.plugins) {
    for (const vitrifyPluginConfig of vitrifyConfig.vitrify.plugins) {
      const vitrifyPlugin = await vitrifyPluginConfig.plugin({
        ssr,
        pwa: isPwa,
        options: vitrifyPluginConfig.options
      })
      if ('plugin' in vitrifyPlugin) {
        vitrifyPlugins.push(vitrifyPlugin.plugin)
      } else if ('plugins' in vitrifyPlugin) {
        vitrifyPlugins.push(...vitrifyPlugin.plugins)
      }

      if (vitrifyPlugin.config) {
        vitrifyConfig = mergeConfig(vitrifyConfig, vitrifyPlugin.config)
      }
    }
  }

  let onAppRenderedHooks: OnAppRenderedHook[]
  let onAppRenderedFiles: OnAppRenderedHookFile[]
  let onTemplateRenderedHooks: OnTemplateRenderedHook[]
  let onTemplateRenderedFiles: OnTemplateRenderedHookFile[]
  let onAppMountedHooks: OnAppMountedHook[]
  let onAppMountedFiles: OnAppMountedHookFile[]
  let OnAppCreatedHooks: OnAppCreatedHook[]
  let onAppCreatedFiles: OnAppCreatedHookFile[]
  let onSetupFiles: OnSetupHookFile[]
  let globalCss: string[] = []
  let staticImports: StaticImports
  let sassVariables: Record<string, string | undefined>
  let globalSass: string[]
  let serverModules: string[] = internalServerModules

  if (vitrifyConfig.vitrify?.ssr?.serverModules)
    serverModules = [
      ...serverModules,
      ...vitrifyConfig.vitrify.ssr.serverModules
    ]

  const unoCssContentPipelineInclude = [
    /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/
  ]
  if (
    typeof vitrifyConfig.vitrify?.unocss?.content?.pipeline === 'object' &&
    vitrifyConfig.vitrify?.unocss?.content?.pipeline?.include &&
    Array.isArray(vitrifyConfig.vitrify?.unocss?.content?.pipeline?.include)
  ) {
    unoCssContentPipelineInclude.push(
      ...vitrifyConfig.vitrify.unocss.content.pipeline.include
    )
  }
  if (
    vitrifyConfig.vitrify?.unocss?.presets?.some(async (preset) => {
      if (!Array.isArray(preset)) {
        return (await preset).name === 'quasar'
      }
    })
  ) {
    // unoCssContentPipelineInclude.push(/quasar\/src\/.*\.js/)
  }

  const plugins: ViteUserConfig['plugins'] = [
    {
      name: 'vitrify-transforms',
      enforce: 'pre',
      transform: (code, id) => {
        if (['main.ts', 'vitrify'].every((val) => id.includes(val))) {
          if (!isPwa)
            code = code.replace(
              /\/\/ @vitrify-pwa-only((.|\n)*)\/\/ @vitrify-pwa-only-end/,
              ''
            )
        }
        if (['RootComponent.vue', 'vitrify'].every((val) => id.includes(val))) {
          const css = `${globalCss
            .map((css) => `@import '${css}';`)
            .join('\n')}\n`

          const sass = [
            ...Object.entries(sassVariables)
              .filter(([key, value]) => value)
              .map(([key, value]) => `${key}: ${value}`),
            ...globalSass.map((sass) => `@import '${sass}'`)
          ].join('\n')
          code = code
            .replace(/<style>(.*?)<\/style>/, '<style>' + css + '</style>')
            .replace(
              /<style lang="sass">(.*?)<\/style>/,
              '<style lang="sass">' + sass + '</style>'
            )
        }

        return code
      }
    },
    ...frameworkPlugins,
    ...vitrifyPlugins,
    {
      name: 'vitrify-setup',
      enforce: 'post',
      config: (config: VitrifyConfig, env) => {
        onAppRenderedHooks = config.vitrify?.hooks?.onAppRendered || []
        onAppRenderedFiles = config.vitrify?.hooks?.onAppRenderedFiles || []
        onTemplateRenderedHooks =
          config.vitrify?.hooks?.onTemplateRendered || []
        onTemplateRenderedFiles =
          config.vitrify?.hooks?.onTemplateRenderedFiles || []
        onAppMountedHooks = config.vitrify?.hooks?.onAppMounted || []
        onAppMountedFiles = config.vitrify?.hooks?.onAppMountedFiles || []
        OnAppCreatedHooks = config.vitrify?.hooks?.onAppCreated || []
        onAppCreatedFiles = config.vitrify?.hooks?.onAppCreatedFiles || []
        onSetupFiles = config?.vitrify?.hooks?.onSetup || []
        globalCss = config.vitrify?.globalCss || []
        staticImports = config.vitrify?.staticImports || {}
        sassVariables = config.vitrify?.sass?.variables || {}
        globalSass = config.vitrify?.sass?.global || []

        return
      },
      async handleHotUpdate({ server }) {
        if (server.fastifyRestart) await server.fastifyRestart()
      },
      configureServer(server) {
        server.middlewares.use('/', (req, res, next) => {
          if (req.url?.endsWith('.html')) req.url = req.url.replace('.html', '')
          next()
        })
      },
      configResolved: (config) => {
        if (process.env.DEBUG) {
          console.log(config)
        }
      },
      resolveId(id) {
        if (VIRTUAL_MODULES.includes(id)) return { id }
        return
      },
      load(id) {
        if (id === 'virtual:vitrify-hooks') {
          return `export const onAppMounted = [${onAppMountedHooks
            .map((fn) => `${String(fn)}`)
            .join(', ')}]
            ${onAppMountedFiles
              .map((url, index) => {
                const varName = fileURLToPath(url)
                  .replaceAll('/', '')
                  .replaceAll(':', '')
                  .replaceAll('\\', '')
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                  .replaceAll('_', '')
                  .replaceAll('+', '')

                return `import ${varName} from '${
                  new URL(url, appDir).href
                }'; onAppMounted.push(${varName});`
              })
              .join('\n')}
            export const onAppRendered = [${onAppRenderedHooks
              .map((fn) => `${String(fn)}`)
              .join(', ')}]
            ${onAppRenderedFiles
              .map((url, index) => {
                const varName = fileURLToPath(url)
                  .replaceAll('/', '')
                  .replaceAll(':', '')
                  .replaceAll('\\', '')
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                  .replaceAll('_', '')
                  .replaceAll('+', '')

                return `import ${varName} from '${
                  new URL(url, appDir).href
                }'; onAppRendered.push(${varName});`
              })
              .join('\n')}
            export const onTemplateRendered = [${onTemplateRenderedHooks
              .map((fn) => `${String(fn)}`)
              .join(', ')}]
            ${onTemplateRenderedFiles
              .map((url, index) => {
                const varName = fileURLToPath(url)
                  .replaceAll('/', '')
                  .replaceAll(':', '')
                  .replaceAll('\\', '')
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                  .replaceAll('_', '')
                  .replaceAll('+', '')

                return `import ${varName} from '${
                  new URL(url, appDir).href
                }'; onTemplateRendered.push(${varName});`
              })
              .join('\n')}
            export const onAppCreated = [${OnAppCreatedHooks.map(
              (fn) => `${String(fn)}`
            ).join(', ')}]
            ${onAppCreatedFiles
              .map((url, index) => {
                const varName = fileURLToPath(url)
                  .replaceAll('/', '')
                  .replaceAll(':', '')
                  .replaceAll('\\', '')
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                  .replaceAll('_', '')
                  .replaceAll('+', '')

                return `import ${varName} from '${
                  new URL(url, appDir).href
                }'; onAppCreated.push(${varName});`
              })
              .join('\n')}
            export const onSetup = []
            ${onSetupFiles
              .map((url, index) => {
                const varName = fileURLToPath(url)
                  .replaceAll('/', '')
                  .replaceAll(':', '')
                  .replaceAll('\\', '')
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                  .replaceAll('_', '')
                  .replaceAll('+', '')

                return `import ${varName} from '${
                  new URL(url, appDir).href
                }'; onSetup.push(${varName});`
              })
              .join('\n')}`
        } else if (id === 'virtual:static-imports') {
          return `${Object.entries(staticImports)
            .map(([key, value]) => {
              const deduped = [...new Set(value)]
              return `export { ${deduped.join(',')} } from '${key}';`
            })
            .join('\n')}`
        } else if (id === 'vitrify.sass') {
          return [
            ...Object.entries(sassVariables).map(
              ([key, value]) => `${key}: ${value}`
            ),
            ...globalSass.map((sass) => `@import '${sass}'`)
          ].join('\n')
        } else if (id === 'virtual:vitrify-config') {
          return `export default ${JSON.stringify(vitrifyConfig)}`
        }
        return null
      },
      transformIndexHtml: {
        order: 'post',
        handler: (html) => {
          const headContent = html.match(/<head>(.|\n)*<\/head>/)
          if (headContent) {
            const headLinks = headContent[0].match(/<link (.*?)>/g)
            if (headLinks) {
              const headWithoutLinks = headContent[0].replaceAll(
                /<link (.*?)>\n?/g,
                ''
              )
              const headWithSortedLinks = headWithoutLinks.replace(
                '</head>',
                [
                  ...headLinks.sort((link) => (link.includes('.css') ? -1 : 0)),
                  '</head>'
                ].join('\n')
              )
              return html.replace(/<head>(.|\n)*<\/head>/, headWithSortedLinks)
            }
          }
        }
      }
    },
    Components({
      ...vitrifyConfig.vitrify?.unpluginVueComponents,
      exclude: [
        new RegExp(
          `[\\/]node_modules[\\/].*[\\/]!(${serverModules.join('|')})`
        ),
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/
      ]
    }),
    UnoCSS({
      ...vitrifyConfig.vitrify?.unocss,
      content: {
        pipeline: {
          include: unoCssContentPipelineInclude
        }
      }
    })
  ]
  if (isPwa) {
    plugins.unshift(
      VitePWA({
        injectRegister: null,
        workbox: {
          globPatterns: ['**/*.{js,mjs,css,html,ico,png,svg,pdf}']
        },
        ...vitrifyConfig.vitrify?.pwa
      })
    )
  }
  if (command !== 'test') {
    plugins.unshift({
      name: 'html-transform',
      enforce: 'pre',
      transformIndexHtml: {
        order: 'pre',
        handler: (html) => {
          let entry: string
          switch (ssr) {
            case 'ssg':
            case 'server':
            case 'client':
              entry = fileURLToPath(
                new URL('ssr/entry-client.ts', frameworkDir)
              )
              break
            case 'fastify':
              entry = fileURLToPath(new URL('entry.ts', fastifyDir))
              break
            default:
              entry = fileURLToPath(new URL('csr/entry.ts', frameworkDir))
          }
          const entryScript = `<script type="module" src="${entry}"></script>`
          html = appendToBody(entryScript, html)
          if (productName) html = addOrReplaceTitle(productName, html)
          return html
        }
      }
    })

    if (debug) plugins.push(visualizer())
  }

  // Vue now only exports CJS for Node
  // Add the deps as devDependency
  const vueInternalPkgs = [
    '@vue/runtime-dom',
    '@vue/runtime-core',
    '@vue/reactivity',
    '@vue/shared',
    '@vue/server-renderer'
  ]

  const vuePkgAliases: Alias[] = []
  if (packageUrls['vue']) {
    for (const pkg of vueInternalPkgs) {
      const specifier = pkg.split('/').at(-1)
      const pkgJsonPath = await findDepPkgJsonPath(pkg, fileURLToPath(appDir!))
      if (pkgJsonPath)
        vuePkgAliases.push({
          find: pkg,
          replacement: fileURLToPath(
            new URL(
              `./dist/${specifier}.esm-bundler.js`,
              `file://${pkgJsonPath}` || ''
            )
          )
        })

      vuePkgAliases.push(
        {
          find: new RegExp('^vue$'),
          replacement: fileURLToPath(
            new URL('./dist/vue.runtime.esm-bundler.js', packageUrls['vue'])
          )
        },
        // {
        //   find: new RegExp('^vue-router$'),
        //   replacement: fileURLToPath(
        //     new URL(
        //       './dist/vue-router.esm-bundler.js',
        //       packageUrls['vue-router']
        //     )
        //   )
        // },
        ...vuePkgAliases
      )
    }
  }

  const alias: Alias[] = [
    { find: 'src', replacement: fileURLToPath(srcDir) },
    { find: 'app', replacement: fileURLToPath(appDir) },
    { find: 'cwd', replacement: fileURLToPath(cwd) },
    { find: 'boot', replacement: fileURLToPath(new URL('boot/', srcDir)) },
    { find: 'assets', replacement: fileURLToPath(new URL('assets/', srcDir)) }
  ]

  if (framework === 'vue') alias.push(...vuePkgAliases)

  if (mode === 'development' && vitrifyConfig.vitrify?.dev?.alias)
    alias.push(...vitrifyConfig.vitrify.dev.alias)

  if (command === 'test')
    alias.push({
      find: 'vitest',
      replacement: fileURLToPath(new URL(await resolve('vitest', cliDir)))
    })

  let rollupOptions: RollupOptions = {}
  let noExternal: RegExp[] | string[] = [
    new RegExp(`^(?!(${[...builtinModules, ...serverModules].join('|')}))`)
  ]
  const external = [...builtinModules, ...serverModules]

  if (ssr === 'server') {
    rollupOptions = {
      ...rollupOptions,
      input: [
        fileURLToPath(new URL('ssr/entry-server.ts', frameworkDir)),
        fileURLToPath(new URL('ssr/prerender.ts', frameworkDir)),
        fileURLToPath(new URL('ssr/fastify-ssr-plugin.ts', frameworkDir)),
        fileURLToPath(new URL('ssr/server.ts', frameworkDir))
      ],
      external,
      output: {
        minifyInternalExports: false,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        format: 'es',
        manualChunks: manualChunksFn(vitrifyConfig?.vitrify?.manualChunks)
      }
    }
    // Create a SSR bundle
    noExternal = [
      new RegExp(`^(?!(${[...builtinModules, ...serverModules].join('|')}))`)
    ]
  } else if (ssr === 'fastify') {
    rollupOptions = {
      ...rollupOptions,
      input: [fileURLToPath(new URL('server.ts', fastifyDir))],
      external,
      output: {
        minifyInternalExports: false,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        format: 'es',
        manualChunks: manualChunksFn(vitrifyConfig?.vitrify?.manualChunks)
      }
    }
    // Create a SSR bundle
    noExternal = [
      new RegExp(`^(?!(${[...builtinModules, ...serverModules].join('|')}))`)
    ]
  } else {
    rollupOptions = {
      ...rollupOptions,
      external,
      output: {
        minifyInternalExports: false,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        format: 'es',
        manualChunks: manualChunksFn(vitrifyConfig?.vitrify?.manualChunks)
      }
    }
  }

  const config = {
    root: fileURLToPath(appDir),
    appType: ssr ? 'custom' : 'spa',
    publicDir: fileURLToPath(publicDir),
    base,
    envDir: fileURLToPath(appDir),
    vitrify: {
      productName,
      urls: {
        app: appDir,
        cli: cliDir,
        src: srcDir,
        cwd,
        packages: packageUrls
      }
    },
    plugins,
    optimizeDeps: {
      exclude: [
        'vue',
        'vue-router',
        'virtual:pwa-register/vue',
        ...serverModules,
        ...builtinModules
      ]
    },
    resolve: {
      dedupe: ['vue', 'vue-router'],
      alias
    },
    build: {
      target: 'esnext',
      ssr: ssr === 'server' || ssr === 'fastify' ? true : false,
      ssrManifest: ssr === 'client' || ssr === 'ssg',
      rollupOptions
    },
    ssr: {
      // Create a SSR bundle
      external,
      noExternal
    },
    define: {
      __HOST__: `'localhost'`,
      __BASE_URL__: `'${base}'`,
      __IS_PWA__: `${isPwa}`
    },
    // environments: {
    // },
    server: {
      // https: vitrifyConfig.server?.https,
      // middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
      middlewareMode: ssr ? true : false,
      fs: {
        strict: false, // https://github.com/vitejs/vite/issues/8175
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          searchForWorkspaceRoot(fileURLToPath(appDir)),
          searchForWorkspaceRoot(fileURLToPath(cliDir)),
          fileURLToPath(appDir)
        ]
      },
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      }
    }
  } as VitrifyConfig

  return mergeConfig(config, vitrifyConfig)
}

export const vitrifyDir = new URL('..', import.meta.url)
export { prerender } from './frameworks/vue/prerender.js'

export type { VitrifyConfig, VitrifyConfigAsync, VitrifyPlugin, VitrifyContext }
