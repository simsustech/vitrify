// The smallest app that asks for deferred hydration: the tests read the built
// HTML this config produces (the entry as a module script replaced by the inline
// bootstrap, and no `modulepreload` links left behind).
export default {
  vitrify: {
    deferHydration: true
  }
}
