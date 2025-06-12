# Why Vitrify

There are a dozen of frameworks with similar functionality, so why Vitrify?
In essence, because Vitrify is not a framework but just a powerful extension of Vite. There is no requirement to adapt a new framework or make major changes when switching to Vitrify if you already are a Vite user. If you need feature X when using Vite, it should be implemented with a Vite plugin. Similarly, if you need feature Y when using Vitrify, it should be implemented with a Vitrify plugin.

Vitrify provides advanced features such as SSR, dynamic plugins, hooks and ESM support out of the box. This is entirely possible with just a plain Vite setup, but for example [adding SSR requires a lot of boilerplate](https://vite.dev/guide/ssr.html#server-side-rendering-ssr).

You can think of Vitrify as a mix of, or an alternative to [Quasar CLI](https://quasar.dev/quasar-cli-vite/quasar-config-file), [Nuxt](https://nuxt.com/) (or [Next](https://nextjs.org/)/[SvelteKit](https://svelte.dev/tutorial/kit/introducing-sveltekit)), [Vike](https://vike.dev/) and [@fastify/vite](https://fastify-vite.dev/).
