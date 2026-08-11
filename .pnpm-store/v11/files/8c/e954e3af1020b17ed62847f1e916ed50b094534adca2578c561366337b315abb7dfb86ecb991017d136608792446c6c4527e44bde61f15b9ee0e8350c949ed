export default function frameDebounce(fn) {
  let frame = null
  let callArgs = null
  let context = null

  function debounced(...args) {
    // Always capture the latest arguments and context
    callArgs = args
    // oxlint-disable-next-line unicorn/no-this-assignment
    context = this

    // If a frame is already requested, just update the args/context and wait
    if (frame !== null) return

    frame = window.requestAnimationFrame(() => {
      fn.apply(context, callArgs)

      // Clean up state so the next call triggers a new frame
      frame = null
      callArgs = null
      context = null
    })
  }

  debounced.cancel = () => {
    if (frame !== null) {
      window.cancelAnimationFrame(frame)
      frame = null
    }
    callArgs = null
    context = null
  }

  return debounced
}
