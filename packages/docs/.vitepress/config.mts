import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitrify',
  description:
    'Create full-stack web applications and websites with Vite as the backbone.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/get-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Get started', link: '/get-started' },
          { text: 'Why Vitrify', link: '/why-vitrify' },
          { text: 'Features', link: '/features' }
        ]
      },
      {
        text: 'Vitrify configuration',
        items: [
          {
            text: 'API',
            link: '/vitrify-config'
          },
          {
            text: 'Examples',
            link: '/examples-vitrify-config'
          },
          {
            text: 'Plugins',
            link: '/plugins'
          },
          {
            text: 'Hooks',
            items: [
              {
                text: 'Functions vs files',
                link: '/hooks-functions-vs-files'
              }
            ]
          }
        ]
      },
      {
        text: 'Development',
        items: [
          {
            text: 'Optimizations',
            link: '/development-optimizations'
          },
          {
            text: 'HTTPS',
            link: '/development-https'
          },
          { text: 'Notes', link: '/notes' }
        ]
      },
      { text: 'Tools', link: '/tools' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/simsustech/vitrify' }
    ]
  }
})
