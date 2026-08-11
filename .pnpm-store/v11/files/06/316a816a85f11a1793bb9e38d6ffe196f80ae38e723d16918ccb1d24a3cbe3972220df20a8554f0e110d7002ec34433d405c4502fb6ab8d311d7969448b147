export default function throttle(fn, limit = 250) {
  let wait = false,
    result

  return function runThrottle(...args) {
    if (!wait) {
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)

      result = fn.apply(this, args)
    }

    return result
  }
}
