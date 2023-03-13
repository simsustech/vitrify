# Vitrify

> Vite as your Full Stack development tool

Vitrify is an abstraction over Vite similar to how Vite is an abstraction over Rollup and esbuild. It enables you to use Vite as your full-stack development tool.

## Try it online

https://codesandbox.io/p/sandbox/vitrify-gtg4dp

## Features

- ESM only
- Fully compatible with Vite configuration.
- Integration with Fastify.
- Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generator (SSG) and Fastify server build and development modes.
- Plugins for UI frameworks which can read their configuration from vitrify.config.js.
- A few helpful [configuration options](./packages/vitrify/src/node/vitrify-config.ts)
- Implements functional programming.
- Fully typed.

## Supported frontend frameworks

- [Vue](https://vuejs.org/)
  - [Quasar](https://quasar.dev/)

## Packages

| Package                                   | Version                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [vitrify](packages/vitrify)               | [![vitrify version](https://img.shields.io/npm/v/vitrify.svg?label=%20)](packages/vitrify/README.md)                      |
| [create-vitrify](packages/create-vitrify) | [![create-vitrify version](https://img.shields.io/npm/v/create-vitrify.svg?label=%20)](packages/create-vitrify/README.md) |
| [plugin-env](packages/plugin-env)         | [![pugin-env version](https://img.shields.io/npm/v/@vitrify/plugin-env.svg?label=%20)](packages/plugin-env/README.md)     |

## Credits

Thanks to:

- [Razvan Stoenescu](https://github.com/rstoenescu/) for quasar and @quasar/app.
- [Jeff Galbraith](https://github.com/hawkeye64/) for Quasar App Extensions.
- [Anthony Fu](https://github.com/antfu/) for unplugin-vue-components and Vitest.

And of course the Vite, Vue, Quasar and Fastify teams.
