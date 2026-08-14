# Vitrify

> Create full-stack web applications and websites with Vite as the backbone.

Vitrify is a Vite extension — not a framework — that preconfigures build modes, SSR, SSG, Fastify integration, and plugin support so you can build web apps without fighting tooling.

## Quick start

```
pnpm create vitrify
cd <project-name>
pnpm i
pnpm run dev
```

## Build modes

Vitrify has four build modes, controlled by `-m <mode>`:

| Mode      | Output                                  | Description                                                                                                                                                                                                                                                    |
| --------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `csr`     | `dist/csr/`                             | Standard client-side SPA. Single Vite build, outputs `index.html` + assets. No server needed — serve with any static host.                                                                                                                                     |
| `ssr`     | `dist/ssr/client/` + `dist/ssr/server/` | Two-phase build. Phase 1 builds client assets (with `ssrManifest: true` for preload links). Phase 2 builds an ESM server bundle with `build.ssr: true`. The server bundle is loaded by the built-in Fastify server and renders pages on demand.                |
| `ssg`     | `dist/static/`                          | Three-phase build. Same as SSR (client + server bundles), then a prerender phase that iterates every route, calls the SSR render function, inlines critical CSS via **Beasties**, and writes static `.html` files. Dynamic routes (`:param`, `*`) are skipped. |
| `fastify` | `dist/server/`                          | Fastify-only bundle. No Vue rendering — just the Fastify server with any `onSetup` hooks. Used for pure API servers that share the same toolchain.                                                                                                             |

### Dev server

`vitrify dev` starts a Vite dev server with HMR. In SSR/Fastify modes it also starts a Fastify server that proxies through Vite's middleware for hot-reloadable server rendering.

- Port auto-increments from 3000 if the port is taken.
- SSR dev: Fastify server uses Vite's `environment.runner.import()` so every page request gets fresh code — no server restart needed.
- Fastify dev: the Fastify server restarts on HMR via `vite.fastifyRestart()`.

## Architecture

### Monorepo structure

```
vitrify/
├── packages/
│   ├── vitrify/            # Core framework
│   │   └── src/
│   │       ├── node/       # Build-time: CLI, config, plugins, SSR server
│   │       │   ├── bin/    # CLI commands (dev, build, test, run)
│   │       │   ├── plugins/# Built-in plugins (Quasar, Pinia)
│   │       │   ├── frameworks/vue/  # SSR/SSG runtime server
│   │       │   └── index.ts         # baseConfig() — the main Vite config factory
│   │       └── vite/       # Runtime code (bundled into user apps)
│   │           ├── vue/    # CSR + SSR entry points
│   │           │   ├── csr/    # Client-side rendering entry
│   │           │   └── ssr/    # Server-side rendering entry
│   │           └── fastify/    # Fastify-mode server entry
│   ├── tools/              # @vitrify/tools — Handlebars, env, scrypt
│   ├── create-vitrify/     # Scaffolding CLI
│   └── docs/               # Documentation site
```

### Two contexts

Vitrify code runs in two different contexts:

- **Node (build-time):** `src/node/` runs during `vitrify dev` or `vitrify build`. Has access to the filesystem, Vite config APIs, and Fastify. Imports use Node-specific modules (`fs`, `path`, `fastify`).
- **Vite (runtime):** `src/vite/` is bundled into the user's application and runs in the browser (CSR) or on the server (SSR). Uses `import.meta.env.SSR` to branch between client and server behavior.

The boundary is enforced by the `ssr.external` and `ssr.noExternal` config in `baseConfig()`.

### Build pipeline (`baseConfig()` in `src/node/index.ts`)

The `baseConfig()` function is the heart of Vitrify's Vite configuration. It:

1. Determines SSR mode from the `ssr` parameter (`false`, `'client'`, `'server'`, `'ssr'`, `'ssg'`, `'fastify'`)
2. Sets the correct `outDir` (`dist/csr`, `dist/ssr/client`, `dist/ssr/server`, `dist/static`, `dist/server`)
3. Configures Rollup input entries based on mode (SSR server gets multiple entries: `entry-server.ts`, `prerender.ts`, `fastify-ssr-plugin.ts`, `server.ts`)
4. Sets `build.cssMinify` and `build.ssrManifest` as needed
5. Adds Vite plugins in order: `vitrify-transforms` → `@vitejs/plugin-vue` → user Vitrify plugins → `vitrify-setup` → `unplugin-vue-components` → UnoCSS → PWA → html-transform
6. For SSR server builds: marks Node builtins and user-configured `serverModules` as external, sets `noExternal` to bundle everything else
7. Imports all user-registered Vitrify plugins and merges their `config()` contributions

### Virtual module system

Vitrify uses Vite virtual modules as a dependency injection layer. Key virtual modules:

| Module                     | Contents                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `virtual:vitrify-hooks`    | All hook arrays (`onSetup`, `onAppCreated`, `onAppMounted`, `onAppRendered`, `onTemplateRendered`), dynamically assembled from config hooks + hook file URLs |
| `virtual:vitrify-config`   | Full vitrify config object as a JSON export — available at runtime                                                                                           |
| `virtual:static-imports`   | Static re-exports: `export { X } from 'package'` for code-split-safe imports                                                                                 |
| `virtual:quasar`           | Re-exports from `quasar/src/components.js`, `plugins.js`, `composables.js`, `directives.js`, `utils.js` + `installQuasar`                                    |
| `virtual:quasar-plugins`   | Only the user-selected Quasar plugins (enables tree-shaking)                                                                                                 |
| `virtual:quasar-iconSet`   | The resolved icon set module (string import or inline object)                                                                                                |
| `virtual:quasar-iconMapFn` | The user-provided icon mapping function, stringified via `.toString()`                                                                                       |

### TypeScript

Vitrify ships a client-side type declaration file at `vitrify/client` (referenced from `tsconfig.json` via `"types": ["vite/client", "vitrify/client"]`, as generated by `create-vitrify`). It declares:

- The virtual modules above, so `virtual:*` imports type-check in app code
- The build-time constants replaced via `define`: `__BASE_URL__`, `__HOST__`, `__IS_PWA__`, `__DEBUG__` (plus `__DEV__` and `__QUASAR_VERSION__` with the Quasar plugin)

It requires `moduleResolution: "bundler"` (or `node16`/`nodenext`) and includes `vite/client` via a triple-slash reference.

### SSR rendering flow

#### Production SSR

```
Request → Fastify → fastifySsrPlugin → loadSSRAssets() loads:
  1. dist/ssr/client/index.html (HTML template)
  2. dist/ssr/client/.vite/ssr-manifest.json (preload manifest)
  3. dist/ssr/server/entry-server.mjs (render function)
  4. dist/ssr/server/virtual_vitrify-hooks.mjs (hook functions)

render(url, manifest, ssrContext):
  1. createApp(url, ssrContext) — creates Vue app, pushes route
  2. renderToString(app, ssrContext) — renders to HTML string
  3. renderPreloadLinks() — generates <link rel="modulepreload"> tags
  4. Returns { html, preloadLinks }

renderHtml():
  1. Calls render() → gets HTML + preload links
  2. Runs onAppRendered hooks (Pinia state serialization, etc.)
  3. Injects __INITIAL_STATE__ script (devalue for Pinia, JSON for provide/colada)
  4. Assembles final HTML: template with injected app HTML, preloads, state
  5. Runs onTemplateRendered hooks (Quasar SSR context injection)
  6. Returns final HTML → Fastify sends response
```

#### Development SSR

Same flow, but the render function comes from Vite's `environment.runner.import()` instead of a pre-built module. This gives hot-reloadable server rendering — file changes are reflected on the next request without restarting the server.

### SSG prerendering

The SSG build adds a third phase after the client and server SSR builds:

1. Imports the server bundle's `prerender.mjs` entry
2. Calls `getRoutes()` from the server bundle to discover all static routes
3. Filters out dynamic routes (those containing `:` or `*`)
4. For each route: calls `renderHtml()` → Beasties critical CSS inliner → writes `[path].html` to `dist/static/`
5. Creates directory structure matching route paths (e.g., `/about/team` → `dist/static/about/team/index.html`)

## Hooks

Vitrify provides five hook points that let plugins and user code inject behavior at different stages:

| Hook                 | When it runs                                           | Context           | Signature                                                            |
| -------------------- | ------------------------------------------------------ | ----------------- | -------------------------------------------------------------------- |
| `onSetup`            | After Fastify server initialization, before `listen()` | Node (build-time) | `(fastify: FastifyInstance, opts?: { vite?: ViteDevServer }) => any` |
| `onAppCreated`       | After `createApp()` in SSR/CSR entry                   | Runtime (Vue)     | `(app: VueApp, ssrContext?) => void`                                 |
| `onAppMounted`       | Inside Vue's `onMounted()` lifecycle — client only     | Runtime (browser) | `(app: VueApp) => void`                                              |
| `onAppRendered`      | After SSR `renderToString()`, before template assembly | Runtime (server)  | `(app: VueApp, ssrContext) => void`                                  |
| `onTemplateRendered` | After HTML template assembly, before sending response  | Runtime (server)  | `(html: string, ssrContext) => string`                               |

### How hooks are configured

Hooks can be set in `vitrify.config.ts` in two ways:

1. **Inline functions** (short, simple hooks):

```ts
export default defineConfig({
  vitrify: {
    hooks: {
      onAppCreated: [(app) => app.use(pinia)],
      onAppRendered: [
        (app, ctx) => {
          /* serialize state */
        }
      ]
    }
  }
})
```

1. **File references** (separate files, better for complex logic):

```ts
export default defineConfig({
  vitrify: {
    hooks: {
      onSetup: [new URL('./src/setup.ts', import.meta.url)],
      onAppMountedFiles: [new URL('./src/mounted.ts', import.meta.url)]
    }
  }
})
```

Each file must `export default` a function matching the hook's signature. The Vite plugin dynamically imports them at build time and registers them in the `virtual:vitrify-hooks` module.

### onSetup — Fastify server customization

The `onSetup` hook receives the Fastify instance before the server starts listening. Use it to register routes, plugins, or middleware:

```ts
// src/setup.ts
import type { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  fastify.get('/api/health', async () => ({ status: 'ok' }))
  fastify.register(cors, { origin: true })
}
```

The hook can also access the Vite dev server in dev mode via the second argument:

```ts
export default async function (fastify, { vite }) {
  if (vite) fastify.log.info('Dev mode — Vite server available')
}
```

## Vitrify plugin system

Vitrify plugins are objects with a `plugin` function that returns a Vite plugin (or array of plugins) and optionally a `config` to merge.

```ts
interface VitrifyPlugin<Options> {
  ({ ssr, pwa, mode, command, options }): {
    plugin?: Plugin
    plugins?: Plugin[]
    config?: Partial<VitrifyConfig>
  }
}
```

The `plugin` factory receives context (`ssr`, `pwa`, `mode`, `command`) plus the user-provided `options`. It returns:

- `plugin` or `plugins`: Vite plugin(s) to inject
- `config`: Partial Vitrify/Vite config to merge into the final config

### Built-in plugins

#### QuasarPlugin

Full Quasar UI framework integration. See `src/node/plugins/quasar/index.ts`.

Handles:

- Component auto-import via `unplugin-vue-components` + `QuasarResolver`
- Virtual module system for tree-shaken Quasar imports
- SASS variables and global SASS imports
- Quasar SSR context injection (`onTemplateRendered`)
- Quasar SSR constants (`__QUASAR_SSR__`, `__QUASAR_SSR_SERVER__`, `__QUASAR_SSR_CLIENT__`)
- Icon set resolution (string path or custom object)

```ts
import { QuasarPlugin } from 'vitrify/plugins'

export default defineConfig({
  vitrify: {
    plugins: [{
      plugin: QuasarPlugin,
      options: {
        framework: {
          components: [...],
          plugins: ['Dialog', 'Notify'],
          iconSet: 'svg-material-icons'
        },
        extras: ['material-icons'],
        disableSass: true  // When using UnoCSS
      }
    }]
  }
})
```

#### PiniaPlugin

Vue store integration with optional SSR hydration via Pinia Colada.

```ts
import { PiniaPlugin } from 'vitrify/plugins'

export default defineConfig({
  vitrify: {
    plugins: [
      {
        plugin: PiniaPlugin,
        options: { colada: true }
      }
    ]
  }
})
```

## Configuration reference

See the full config type in `src/node/vitrify-config.ts`.

```ts
interface VitrifyConfig {
  vitrify?: {
    lang?: string // App language
    productName?: string // HTML <title>
    plugins?: VitrifyPluginRegistration[]
    globalCss?: string[] // Global CSS imports
    staticImports?: Record<string, string[]>
    hooks?: {
      onSetup?: URL[] | Function[]
      onAppCreated?: Function[]
      onAppCreatedFiles?: URL[]
      onAppMounted?: Function[]
      onAppMountedFiles?: URL[]
      onAppRendered?: Function[]
      onAppRenderedFiles?: URL[]
      onTemplateRendered?: Function[]
      onTemplateRenderedFiles?: URL[]
    }
    sass?: {
      variables?: Record<string, string | undefined>
      global?: string[]
    }
    ssr?: {
      serverModules?: string[] // Packages excluded from server bundle
      fastify?: FastifyServerOptions // Fastify constructor options
    }
    dev?: { alias?: Alias[] }
    unocss?: UnoCSSUserConfig
    unpluginVueComponents?: Options
    pwa?: Partial<VitePWAOptions>
    manualChunks?: string[]
  }
}
```

## Features

- 🦾 **Four build modes**: CSR, SSR, SSG, Fastify
- 🔥 **Fastify SSR plugin** — handles dev (Vite middleware) and production (`@fastify/static`) transparently
- ✨ **Five hook points**: onSetup, onAppCreated, onAppMounted, onAppRendered, onTemplateRendered
- ⭐ **Plugin system** — Vite plugins with mode-aware configuration
- ⚡ **Preconfigured**: Vue, UnoCSS, unplugin-vue-components, PWA, Pinia
- 🎈 **ESM-first**: server bundles output ESM
- 📥 **Server bundling**: backend code bundles as ESM with Node builtins external
- 🧩 **Quasar support**: full SSR, tree-shaking, icon sets, SASS variables
- 📄 **SSG with critical CSS**: Beasties inlines above-the-fold CSS per route

## Packages

| Package                                   | Description                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| [vitrify](packages/vitrify)               | Core framework — CLI, config, build modes, SSR server |
| [create-vitrify](packages/create-vitrify) | Project scaffolding CLI                               |
| [tools](packages/tools)                   | Handlebars rendering, env loading, scrypt hashing     |

## Framework support

- **Vue 3** — SFC compilation, SSR, hydration
- **Quasar** — via `QuasarPlugin` (components, plugins, icons, SSR context)
- **Pinia** — via `PiniaPlugin` (stores, SSR hydration, Colada)

## Design principles

1. **Dual-environment architecture** — Build-time code (Node) and runtime code (Vite) are cleanly separated by the bundler boundary.
2. **Virtual modules as DI** — Hooks, config, and framework internals are injected through Vite's virtual module system, not file-system imports.
3. **Hook pipeline** — Five well-defined hook points let plugins and user code inject behavior at each stage of the request lifecycle.
4. **Fastify as the HTTP layer** — Always present in SSR/Fastify modes. Dev mode wraps Vite via `@fastify/middie`, production uses `@fastify/static`.
5. **Config merging** — Base config + user config + plugin configs are merged via Vite's `mergeConfig()` (shallow-deep merge).
