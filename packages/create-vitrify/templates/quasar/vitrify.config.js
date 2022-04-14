export default function ({ mode, command }) {
  return {
    vitrify: {
      fastify: {
        // Fastify configuration for SSR
      },
      sassVariables: {
        $primary: '#000000'
      }
    },
    quasar: {
      extras: ['material-icons'],
      framework: {
        components: [
          // Deprecated
        ],
        plugins: []
      }
    }
  }
}
