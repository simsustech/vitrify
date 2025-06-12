# Vitrify

> Create full-stack web applications and websites with Vite as the backbone.

Vitrify allows for preconfigured advanced usage of [Vite](https://vitejs.dev), which enables you to easily develop and build full-stack web applications or static websites.
Vitrify does not aim to be a framework but instead is just a powerful extension of Vite. It provides you all the required configuration options and tools to build your web applications in any way you desire.

## Get started

```
pnpm create vitrify
cd <project-name>
pnpm i
pnpm run dev
```

## Features

- 🦾 Build and development modes:
  - CSR: Client side rendered applications
  - SSR: Server side rendered applications
  - SSG: Static site generator
  - Fastify: Uses the onSetup hooks to setup the Fastify server with HMR
- 🎈 Minification of ESM files.
- 📥 Bundle your server (backend) code.
- ✨ Hooks:
  - onSetup: Sets up your Fastify server directly after initializing.
  - onAppCreated: Functions which run after the application has been created.
  - onAppMounted: Functions which run in the onMounted hook of the application.
  - onRendered: Functions which run after rendering the application (SSR).
  - onTemplateRendered: Functions which run after rendering the template (SSR)
- ⭐ [Vitrify plugins](./packages/vitrify/src/node/plugins/): allows for Vite plugin configuration based on the build mode and dynamic Vite configuration changes.
- 🔥 [Fastify SSR plugin](./packages/vitrify/src/vite/vue/ssr/fastify-ssr-plugin.ts): allows you to integrate a server-side rendered web application into your Fastify server. Handles development and build modes automatically.
- ⚡ Preconfigured Vite plugins:
  - PWA support with [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa).
  - On demand CSS with [unocss](https://unocss.dev).
  - Automatic component resolving with [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components/tree/main).
  - Vue specific:
    - [Pinia (Colada) support](./packages/vitrify/src/node/plugins/pinia/index.ts)

### [Tools](./packages/tools/)

- env: load environment variables from any environment (Node, Vite or Docker).
- render: render files with Handlebars.
- scrypt: hash and compare passwords with [scrypt](https://nodejs.org/api/crypto.html).

## Supported frontend frameworks

- [Vue](https://vuejs.org/)
  - [Quasar](https://quasar.dev/)

## Framework authors

Vitrify is greatly inspired by [Quasar](https://quasar.dev) and provides complete support for all Quasar UI features without the need for Quasar CLI. Have a look at the [QuasarPlugin](./packages/vitrify/src/node/plugins/quasar/index.ts) to see what is possible with Vitrify as your build tool.

## Packages

| Package                                   | Version                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [vitrify](packages/vitrify)               | [![vitrify version](https://img.shields.io/npm/v/vitrify.svg?label=%20)](packages/vitrify/README.md)                      |
| [create-vitrify](packages/create-vitrify) | [![create-vitrify version](https://img.shields.io/npm/v/create-vitrify.svg?label=%20)](packages/create-vitrify/README.md) |
| [tools](packages/tools)                   | [![tools version](https://img.shields.io/npm/v/@vitrify/tools.svg?label=%20)](packages/tools/README.md)                   |
