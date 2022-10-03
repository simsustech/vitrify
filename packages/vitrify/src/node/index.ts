import vuePlugin from '@vitejs/plugin-vue'
import type { Alias, InlineConfig, UserConfig } from 'vite'
import { resolvePackageData } from 'vite'
import { mergeConfig } from 'vite'
import { build } from 'esbuild'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { readFileSync } from 'fs'
import builtinModules from 'builtin-modules'
// import { resolve } from 'import-meta-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import type {
  StaticImports,
  BootFunction,
  OnMountedHook,
  VitrifyConfig,
  OnRenderedHook,
  OnBootHook,
  OnSetupFile
} from './vitrify-config.js'
import type { VitrifyContext } from './bin/run.js'
import type { VitrifyPlugin } from './plugins/index.js'
import { resolve } from './app-urls.js'
import type { ManualChunksOption, RollupOptions } from 'rollup'
import envPlugin from '@vitrify/plugin-env'

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
  'critters'
]

const configPluginMap: Record<string, () => Promise<VitrifyPlugin>> = {
  quasar: () =>
    import('./plugins/quasar.js').then((module) => module.QuasarPlugin)
}

const manualChunkNames = [
  'prerender',
  'fastify-ssr-plugin',
  'fastify-csr-plugin',
  'server'
]

const moduleChunks = {
  vue: ['vue', '@vue', 'vue-router'],
  quasar: ['quasar', '@quasar']
}
const manualChunks: ManualChunksOption = (id: string) => {
  const matchedModule = Object.entries(moduleChunks).find(
    ([chunkName, moduleNames]) =>
      moduleNames.some((moduleName) => id.includes(moduleName + '/'))
  )
  if (id.includes('vitrify/src/')) {
    const name = id.split('/').at(-1)?.split('.').at(0)
    if (name && manualChunkNames.includes(name)) return name
  } else if (
    VIRTUAL_MODULES.some((virtualModule) => id.includes(virtualModule))
  ) {
    return VIRTUAL_MODULES.find((name) => id.includes(name))
  } else if (id.includes('node_modules')) {
    if (matchedModule) {
      return matchedModule[0]
    }
    return 'vendor'
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
  pwa = false,
  debug = false
}: {
  ssr?: 'client' | 'server' | 'ssg' | 'fastify'
  appDir?: URL
  publicDir?: URL
  base?: string
  command?: 'build' | 'dev' | 'test'
  mode?: 'production' | 'development'
  framework?: 'vue'
  pwa?: boolean
  debug?: boolean
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
  /**
   * TODO:Perform some manual check if command is run inside a Quasar Project
   */
  let vitrifyConfig:
    | VitrifyConfig
    | (({
        mode,
        command
      }: {
        mode: string
        command: string
      }) => Promise<VitrifyConfig> | VitrifyConfig)

  try {
    if (fs.existsSync(new URL('vitrify.config.ts', appDir).pathname)) {
      const configPath = new URL('vitrify.config.ts', appDir).pathname
      const bundledConfig = await bundleConfigFile(
        new URL('vitrify.config.ts', appDir).pathname
      )
      fs.writeFileSync(configPath + '.js', bundledConfig.code)
      vitrifyConfig = (await import(configPath + '.js')).default
      fs.unlinkSync(configPath + '.js')
    } else {
      vitrifyConfig = (
        await import(new URL('vitrify.config.js', appDir).pathname)
      ).default
    }
    if (typeof vitrifyConfig === 'function')
      vitrifyConfig = await vitrifyConfig({ mode, command })
  } catch (e) {
    console.log('No vitrify.config.(ts|js) file found, using defaults')
    if (process.env.DEBUG) console.error(e)
    vitrifyConfig = {}
  }

  const localPackages = ['vue', 'vue-router', '@vue/server-renderer']
  // const localPackages: string[] = []
  const cliPackages = []
  const packageUrls: Record<string, URL> =
    vitrifyConfig.vitrify?.urls?.packages || {}
  await (async () => {
    for (const val of localPackages) {
      const pkg = resolvePackageData(val, appDir.pathname)
      if (pkg) packageUrls![val] = new URL(`file://${pkg.dir}/`)
    }
  })()

  // await (async () => {
  //   for (const val of cliPackages)
  //     packageUrls[val] = getPkgJsonDir(
  //       new URL(await resolve(val, cliDir!.href))
  //     )
  // })()

  let productName = 'Product name'
  try {
    ;({ productName } = JSON.parse(
      readFileSync(new URL('package.json', appDir).pathname, {
        encoding: 'utf-8'
      })
    ))
  } catch (e) {
    console.error('package.json not found')
  }

  const frameworkPlugins = []
  for (const framework of Object.keys(configPluginMap)) {
    if (Object.keys(vitrifyConfig).includes(framework)) {
      const plugin = await configPluginMap[framework]()
      frameworkPlugins.push(
        await plugin({
          ssr,
          pwa
        })
      )
    }
  }

  let onBootHooks: OnBootHook[]
  let onRenderedHooks: OnRenderedHook[]
  let onMountedHooks: OnMountedHook[]
  let onSetupFiles: OnSetupFile[]
  let globalCss: string[] = []
  let staticImports: StaticImports
  let sassVariables: Record<string, string>
  let additionalData: string[]
  let globalSass: string[]
  let serverModules: string[] = internalServerModules

  if (vitrifyConfig.vitrify?.ssr?.serverModules)
    serverModules = [
      ...serverModules,
      ...vitrifyConfig.vitrify.ssr.serverModules
    ]

  const plugins: UserConfig['plugins'] = [
    vuePlugin(),
    envPlugin(),
    ...frameworkPlugins,
    {
      name: 'vitrify-setup',
      enforce: 'post',
      config: (config: VitrifyConfig, env) => {
        onBootHooks = config.vitrify?.hooks?.onBoot || []
        onRenderedHooks = config.vitrify?.hooks?.onRendered || []
        onMountedHooks = config.vitrify?.hooks?.onMounted || []
        onSetupFiles = config?.vitrify?.hooks?.onSetup || []
        globalCss = config.vitrify?.globalCss || []
        staticImports = config.vitrify?.staticImports || {}
        sassVariables = config.vitrify?.sass?.variables || {}
        globalSass = config.vitrify?.sass?.global || []
        additionalData = config.vitrify?.sass?.additionalData || []
        return
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
      transform: (code, id) => {
        if (id.endsWith('main.ts') && id.includes('vitrify')) {
          code =
            `${globalCss.map((css) => `import '${css}'`).join('\n')}\n` + code
        }
        return code
      },
      load(id) {
        if (id === 'virtual:vitrify-hooks') {
          return `export const onBoot = [${onBootHooks
            .map((fn) => `${String(fn)}`)
            .join(', ')}]
            export const onMounted = [${onMountedHooks
              .map((fn) => `${String(fn)}`)
              .join(', ')}]
            export const onRendered = [${onRenderedHooks
              .map((fn) => `${String(fn)}`)
              .join(', ')}]
            export const onSetup = []
            ${onSetupFiles
              .map((url, index) => {
                const varName = url.pathname
                  .replaceAll('/', '')
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                return `import ${varName} from '${url.pathname}'; onSetup.push(${varName})`
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
        }
        // else if (id === 'vitrify.css') {
        //   return `${globalCss.map((css) => `@import '${css}'`).join('\n')}`
        // }
        else if (id === 'virtual:vitrify-config') {
          return `export default ${JSON.stringify(vitrifyConfig)}`
        }
        return null
      }
    }
  ]
  if (command !== 'test') {
    plugins.unshift({
      name: 'html-transform',
      enforce: 'pre',
      //       transform: (code, id) => {
      //         if (id.endsWith('App.vue')) {
      //           code =
      //             code +
      //             `<style lang="sass">
      // // do not remove, required for additionalData import
      // </style>`
      //         }
      //         return code
      //       },
      transformIndexHtml: {
        enforce: 'pre',
        transform: (html) => {
          let entry: string
          switch (ssr) {
            case 'ssg':
            case 'server':
            case 'client':
              entry = new URL('ssr/entry-client.ts', frameworkDir).pathname
              break
            case 'fastify':
              entry = new URL('entry.ts', fastifyDir).pathname
              break
            default:
              entry = new URL('csr/entry.ts', frameworkDir).pathname
          }
          const entryScript = `<script type="module" src="${entry}"></script>`
          html = html
            .replace('<!--entry-script-->', entryScript)
            .replace('<!--product-name-->', productName)
          return html
        }
      }
    })

    plugins.unshift({
      name: 'product-name',
      enforce: 'post',
      config: (config: VitrifyConfig, env) => {
        if (config.vitrify?.productName)
          productName = config.vitrify?.productName
        return
      },
      transformIndexHtml: {
        enforce: 'post',
        transform: (html) => {
          html = html.replace('<!--product-name-->', productName)
          return html
        }
      }
    })

    // @ts-ignore
    if (debug) plugins.push(visualizer())
  }

  const alias: Alias[] = [
    { find: 'src', replacement: srcDir.pathname },
    { find: 'app', replacement: appDir.pathname },
    { find: 'cwd', replacement: cwd.pathname },
    { find: 'boot', replacement: new URL('boot/', srcDir).pathname },
    { find: 'assets', replacement: new URL('assets/', srcDir).pathname },
    // ...Object.entries(packageUrls).map(([key, value]) => ({
    //   find: key,
    //   replacement: value.pathname
    // }))
    {
      find: new RegExp('^vue$'),
      replacement: new URL(
        './dist/vue.runtime.esm-bundler.js',
        packageUrls['vue']
      ).pathname
    },
    {
      find: new RegExp('^vue-router$'),
      replacement: new URL(
        './dist/vue-router.esm-bundler.js',
        packageUrls['vue-router']
      ).pathname
    }
  ]
  if (mode === 'development' && vitrifyConfig.vitrify?.dev?.alias)
    alias.push(...vitrifyConfig.vitrify.dev.alias)

  if (command === 'test')
    alias.push({
      find: 'vitest',
      replacement: new URL(await resolve('vitest', cliDir)).pathname
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
        new URL('ssr/entry-server.ts', frameworkDir).pathname,
        new URL('ssr/prerender.ts', frameworkDir).pathname,
        new URL('ssr/server.ts', frameworkDir).pathname
      ],
      external,
      output: {
        minifyInternalExports: false,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        format: 'es',
        manualChunks
      }
    }
    // Create a SSR bundle
    noExternal = [
      new RegExp(`^(?!(${[...builtinModules, ...serverModules].join('|')}))`)
    ]
  } else if (ssr === 'fastify') {
    rollupOptions = {
      ...rollupOptions,
      input: [new URL('server.ts', fastifyDir).pathname],
      external,
      output: {
        minifyInternalExports: false,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        format: 'es',
        manualChunks
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
        manualChunks
      }
    }
  }

  const config = {
    root: appDir.pathname,
    publicDir: publicDir.pathname,
    base,
    envDir: appDir.pathname,
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
      exclude: ['vue', 'vue-router', ...serverModules, ...builtinModules]
    },
    resolve: {
      dedupe: ['vue', 'vue-router'],
      alias
    },
    build: {
      target: ssr === 'server' || ssr === 'fastify' ? 'esnext' : 'modules',
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
      __HOST__: 'localhost',
      __BASE_URL__: `'${base}'`
    }
  } as VitrifyConfig

  return mergeConfig(config, vitrifyConfig)
}

export const vitrifyDir = new URL('..', import.meta.url)
export { prerender } from './frameworks/vue/prerender.js'
export type { VitrifyConfig, VitrifyPlugin, VitrifyContext, BootFunction }
