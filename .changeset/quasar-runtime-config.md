---
'vitrify': minor
---

Let a site pass Quasar's own runtime configuration.

`QuasarPluginOptions.framework` accepted Quasar's components, directives,
plugins, language and icon set — everything except the one object Quasar's
`install` takes for runtime behaviour: `config`. So `dark`, `notify`,
`loading`, `brand` and every plugin default were out of reach, and a site could
not follow the operating system's colour scheme at all.

```ts
{
  plugin: QuasarPlugin,
  options: {
    framework: {
      plugins: ['Dialog', 'Meta'],
      config: { dark: 'auto' }
    }
  }
}
```

The object is spread into the config the plugin already builds, with the
plugin's own `iconMapFn` applied last — a site must not be able to replace the
icon resolution the plugin owns.

`dark` is the reason this matters, and it is not a client-only concern: Quasar's
**server** build reads it, writes `body--light` or `body--dark` into the
prerendered HTML, and appends `data-dark-auto` to the body when the mode is
`auto`. Its client build then reads `prefers-color-scheme` after hydration and
listens for changes. A component that flipped the class in `onMounted` would
fight the prerendered markup and flash; the config is applied before either.
