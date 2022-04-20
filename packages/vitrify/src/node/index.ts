import vuePlugin from '@vitejs/plugin-vue'
import type { InlineConfig, UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import { readFileSync } from 'fs'
import { QuasarPlugin } from './plugins/quasar.js'
import builtinModules from 'builtin-modules'
import { resolve } from 'import-meta-resolve'
import type {
  StaticImports,
  BootFunction,
  OnMountedHook,
  VitrifyConfig,
  SsrFunction
} from './vitrify-config.js'
import type { VitrifyContext } from './bin/run.js'
import type { VitrifyPlugin } from './plugins/index.js'
import type { FastifyInstance } from 'fastify'
import { getPkgJsonDir } from './app-urls.js'

const serverModules = ['fastify', 'middie']

const configPluginMap: Record<string, () => Promise<VitrifyPlugin>> = {
  quasar: () =>
    import('./plugins/quasar.js').then((module) => module.QuasarPlugin)
}

export const VIRTUAL_MODULES = [
  'virtual:fastify-setup',
  'virtual:boot-functions',
  'virtual:ssr-functions',
  'virtual:on-mounted-hooks',
  'virtual:global-css',
  'virtual:static-imports'
]

export const baseConfig = async ({
  ssr,
  appDir,
  publicDir,
  command = 'build',
  mode = 'production',
  framework = 'vue',
  pwa = false
}: {
  ssr?: 'client' | 'server' | 'ssg'
  appDir?: URL
  publicDir?: URL
  command?: 'build' | 'dev' | 'test'
  mode?: 'production' | 'development'
  framework?: 'vue'
  pwa?: boolean
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
  // const {
  //   appDir: tempAppDir,
  //   cliDir,
  //   cliViteDir,
  //   srcDir
  // } = await import('./app-urls.js')
  // const cwd = appDir || tempAppDir
  const frameworkDir = new URL(`${framework}/`, cliViteDir)

  // const localPackages = ['vue', 'vue-router', 'quasar']
  const localPackages = ['vue', 'vue-router']
  const cliPackages = ['vitest']
  const packageUrls: Record<string, URL> = {}
  await (async () => {
    for (const val of localPackages)
      packageUrls[val] = getPkgJsonDir(
        new URL(await resolve(val, appDir!.href))
      )
  })()
  await (async () => {
    for (const val of cliPackages)
      packageUrls[val] = getPkgJsonDir(
        new URL(await resolve(val, cliDir!.href))
      )
  })()

  // if (appDir) {
  //   srcDir = new URL('src/', appDir);
  //   quasarDir = new URL(await resolve('quasar/', appDir.href));
  //   ({ appDir: cwd, cliDir } = await import('./app-urls.js'))
  // } else {
  //   ({ appDir, cliDir, srcDir, quasarDir } = await import('./app-urls.js'))
  //   cwd = appDir
  // }
  // vueDir = new URL('./', await resolve('vue', appDir.href));
  // vueRouterDir = new URL('../', await resolve('vue-router', appDir.href));
  // vitestDir = new URL('../', await resolve('vitest', cliDir.href));

  if (!publicDir) publicDir = new URL('public/', appDir)
  /**
   * TODO:Perform some manual check if command is run inside a Quasar Project
   */
  let vitrifyConfig:
    | VitrifyConfig
    | (({ mode, command }: { mode: string; command: string }) => VitrifyConfig)

  try {
    vitrifyConfig = (
      await import(new URL('vitrify.config.js', appDir).pathname)
    ).default
    if (typeof vitrifyConfig === 'function')
      vitrifyConfig = vitrifyConfig({ mode, command })
  } catch (e) {
    console.error(e)
    console.log('No vitrify.config.js file found, using defaults')
    vitrifyConfig = {}
  }
  let { productName = 'Product name' } = JSON.parse(
    readFileSync(new URL('package.json', appDir).pathname, {
      encoding: 'utf-8'
    })
  )

  const fastifySetup =
    vitrifyConfig.vitrify?.fastify?.setup || ((fastify: FastifyInstance) => {})

  const ssrTransformCustomDir = () => {
    return {
      props: [],
      needRuntime: true
    }
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

  let bootFunctions: BootFunction[]
  let ssrFunctions: SsrFunction[]
  let onMountedHooks: OnMountedHook[]
  let globalCss: string[]
  let staticImports: StaticImports
  let sassVariables: Record<string, string>
  let additionalData: string[]

  const plugins: UserConfig['plugins'] = [
    vuePlugin({
      template: {
        ssr: !!ssr,
        compilerOptions: {
          directiveTransforms: {
            'close-popup': ssrTransformCustomDir,
            intersection: ssrTransformCustomDir,
            ripple: ssrTransformCustomDir,
            mutation: ssrTransformCustomDir,
            morph: ssrTransformCustomDir,
            scroll: ssrTransformCustomDir,
            'scroll-fire': ssrTransformCustomDir,
            'touch-hold': ssrTransformCustomDir,
            'touch-pan': ssrTransformCustomDir,
            'touch-repeat': ssrTransformCustomDir,
            'touch-swipe': ssrTransformCustomDir
          }
        }
      }
    }),
    ...frameworkPlugins,
    // await QuasarPlugin({
    //   ssr: ssr,
    //   pwa: pwa
    //   // quasarDir: packageUrls.quasar
    // }),
    {
      name: 'vitrify-setup',
      enforce: 'post',
      config: async (config: VitrifyConfig, env) => {
        bootFunctions = config.vitrify?.bootFunctions || []
        ssrFunctions = config.vitrify?.ssrFunctions || []
        onMountedHooks = config.vitrify?.hooks?.onMounted || []
        globalCss = config.vitrify?.globalCss || []
        staticImports = config.vitrify?.staticImports || {}
        sassVariables = config.vitrify?.sass?.variables || {}
        additionalData = config.vitrify?.sass?.additionalData || []

        return {
          css: {
            preprocessorOptions: {
              sass: {
                additionalData: [
                  ...Object.entries(sassVariables).map(
                    ([key, value]) => `${key}: ${value}`
                  ),
                  ...additionalData
                  // config.css?.preprocessorOptions?.sass.additionalData
                ].join('\n')
              }
            }
          }
        }
      },
      configResolved: (config) => {
        if (process.env.DEBUG) {
          console.log(config.css?.preprocessorOptions?.sass.additionalData)
          console.log(config.optimizeDeps)
        }
      },
      resolveId(id) {
        if (VIRTUAL_MODULES.includes(id)) return id
        return
      },
      load(id) {
        if (id === 'virtual:fastify-setup') {
          return `export const setup = ${String(fastifySetup)}`
        } else if (id === 'virtual:boot-functions') {
          return `export default [${bootFunctions
            .map((fn) => `${String(fn)}`)
            .join(', ')}]`
        } else if (id === 'virtual:ssr-functions') {
          return `export default [${ssrFunctions
            .map((fn) => `${String(fn)}`)
            .join(', ')}]`
        } else if (id === 'virtual:on-mounted-hooks') {
          return `export default [${onMountedHooks
            .map((fn) => `${String(fn)}`)
            .join(', ')}]`
        } else if (id === 'virtual:global-css') {
          return `${globalCss.map((css) => `import '${css}'`).join('\n')}`
        } else if (id === 'virtual:static-imports') {
          return `${Object.entries(staticImports)
            .map(
              ([key, value]) => `export { ${value.join(',')} } from '${key}';`
            )
            .join('\n')}`
        }
        return null
      }
    }
  ]
  if (command !== 'test') {
    plugins.unshift({
      name: 'html-transform',
      enforce: 'pre',
      transform: (code, id) => {
        if (id.endsWith('App.vue')) {
          code =
            code +
            `<style lang="sass">
// do not remove, required for additionalData import
</style>`
        }
        return code
      },
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
      },
      transformIndexHtml: {
        enforce: 'post',
        transform: (html) => {
          html = html.replace('<!--product-name-->', productName)
          return html
        }
      }
    })
  }

  const alias = [
    { find: 'src', replacement: srcDir.pathname },
    { find: 'app', replacement: appDir.pathname },
    { find: 'cwd', replacement: cwd.pathname },
    { find: 'boot', replacement: new URL('boot/', srcDir).pathname },
    { find: 'assets', replacement: new URL('assets/', srcDir).pathname },
    // ...Object.entries(packageUrls).map(([key, value]) => ({
    //   find: key, replacement: value.pathname
    // })),
    { find: 'vue', replacement: packageUrls['vue'].pathname },
    { find: 'vue-router', replacement: packageUrls['vue-router'].pathname },
    { find: 'vitrify', replacement: cliDir.pathname }
  ]
  if (command === 'test')
    alias.push({
      find: 'vitest',
      replacement: packageUrls.vitest.pathname
    })

  const config = {
    root: frameworkDir.pathname,
    publicDir: publicDir.pathname,
    vitrify: {
      productName,
      urls: {
        // @ts-ignore
        app: appDir,
        cli: cliDir,
        src: srcDir,
        cwd,
        packages: packageUrls
      }
    },
    plugins,
    optimizeDeps: {
      exclude: ['vue']
    },
    resolve: {
      // Dedupe uses require which breaks ESM SSR builds
      // dedupe: [
      //   'vue',
      //   'vue-router'
      // ],
      alias
    },
    build: {
      target: ssr === 'server' ? 'esnext' : 'modules',
      ssr: ssr === 'server' ? true : false,
      ssrManifest: ssr === 'client' || ssr === 'ssg',
      rollupOptions:
        ssr === 'server'
          ? {
              input: [
                new URL('ssr/entry-server.ts', frameworkDir).pathname,
                new URL('ssr/prerender.ts', frameworkDir).pathname,
                new URL('ssr/server.ts', frameworkDir).pathname
              ],
              output: {
                minifyInternalExports: false,
                entryFileNames: '[name].mjs',
                chunkFileNames: '[name].mjs',
                format: 'es',
                manualChunks: (id) => {
                  if (id.includes('fastify-ssr-plugin')) {
                    return 'fastify-ssr-plugin'
                  } else if (id.includes('node_modules')) {
                    return 'vendor'
                  }
                }
              }
            }
          : {
              output: {
                format: 'es'
              }
            }
    },
    // css: {
    //   preprocessorOptions: {
    //     sass: {
    //       additionalData: sass ? [...sass].join('\n') : undefined
    //     }
    //   }
    // },
    ssr: {
      // Create a SSR bundle
      noExternal: [
        new RegExp(
          `^(?!.*(${[...builtinModules, ...serverModules].join('|')}))`
        )
      ]
    },
    define: {
      __BASE_URL__: `'/'`
    }
  } as VitrifyConfig

  return mergeConfig(config, vitrifyConfig)
}

export type { VitrifyConfig, VitrifyPlugin, VitrifyContext, BootFunction }
