export default function ({ mode, command }) {
  return {
    vitrify: {
      hooks: {
        // Vitrify hooks
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
