export const templates = {
  quasar: {
    name: 'quasar',
    fullName: 'Quasar Project',
    description: 'Quasar Framework project',
    url: new URL('../templates/quasar/', import.meta.url)
  },
  plugin: {
    name: 'quasar-plugin',
    fullName: 'Quasar Plugin',
    description: 'Quasar Framework plugin',
    url: new URL('../templates/quasar-plugin/', import.meta.url)
  },
  quasarMonorepo: {
    name: 'quasar-monorepo',
    fullName: 'Quasar monorepo (project + plugin)',
    description: 'Quasar Framework monorepo',
    url: new URL('../templates/quasar-monorepo/', import.meta.url)
  }
}
