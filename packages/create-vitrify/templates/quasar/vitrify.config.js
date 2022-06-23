export default function ({ mode, command }) {
  return {
    vitrify: {
      hooks: {
        // Vitrify hooks
      },
      sass: {
        variables: {
          $primary: '#000000'
        }
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
