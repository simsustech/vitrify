# Vitrify

> Pre-configured Vite CLI for your framework

Vitrify is an abstraction over Vite similar to how Vite is an abstraction over Rollup and esbuild.

## Features

- ESM only
- Fully compatible with Vite configuration.
- Integration with Fastify.
- Client-Side Rendering (CSR), Server-Side Rendering (SSR) and Fastify server build and development modes.
- Plugins for UI frameworks which can read their configuration from vitrify.config.js.
- A few helpful [configuration options](./packages/vitrify/src/node/vitrify-config.ts)
- Implements functional programming.
- Fully typed.

## Supported frameworks

- [Vue](https://vuejs.org/)
  - [Quasar](https://quasar.dev/)

## Packages

| Package                                   | Version                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [vitrify](packages/vitrify)               | [![vitrify version](https://img.shields.io/npm/v/vitrify.svg?label=%20)](packages/vitrify/README.md)               |
| [create-vitrify](packages/create-vitrify) | [![vitrify version](https://img.shields.io/npm/v/create-vitrify.svg?label=%20)](packages/create-vitrify/README.md) |

## Why

I needed some specific features not available in Quasar CLI (Webpack at that time) so I decided to take a deep-dive and try and port it to Vite. In the process I took a leap forward and solely focused on ESM, switched to pnpm and created a modular build tool with improved versions of Quasar CLI's features (SSR, SASS variables, boot files, automatic component registration, app extensions).

## Credits

Thanks to:

- [Razvan Stoenescu](https://github.com/rstoenescu/) for quasar and @quasar/app.
- [Jeff Galbraith](https://github.com/hawkeye64/) for Quasar App Extensions.
- [Anthony Fu](https://github.com/antfu/) for unplugin-vue-components and Vitest.

And of course the Vite, Vue, Quasar and Fastify teams.
