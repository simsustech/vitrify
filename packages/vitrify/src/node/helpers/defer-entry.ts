/**
 * The inline script a `deferHydration` page boots from.
 *
 * A prerendered page is readable before any JavaScript arrives — that is what
 * prerendering is for. But the entry chunk and its `modulepreload` links are
 * fetched *while the HTML is parsed*, so the framework downloads take bandwidth
 * from the stylesheet, the font and the hero image. Lighthouse's mobile
 * simulation charges that to First Contentful Paint: measured 2026-11-02, FCP
 * 2.7 s and a performance score of 67 with the entry in the parsed HTML, FCP
 * 1.2 s and 100 with it loaded here instead.
 *
 * So this script removes the entry from the parsed HTML and adds it back at one
 * of three moments, whichever comes first:
 *
 * - `pointerdown` / `keydown`: a visitor is about to use the page.
 * - `load`: everything else is in, so there is nothing left to compete with.
 * - one second after the first paint: `load` also waits for third-party tags,
 *   and a stalled analytics host then leaves the page inert — measured at 8.1 s
 *   before this trigger existed. One second is enough for the hero image, which
 *   is the largest element on the page, to finish.
 *
 * `started` makes it idempotent, because all three can fire.
 *
 * What a visitor loses: on a slow connection, a click on something that needs
 * hydration (a dialog, a menu) does not respond until the app has booted — the
 * first tap *starts* the boot, the second one acts. That is why the option is
 * off by default.
 */
export const deferEntryScript = (src: string): string => `<script>
  (function () {
    var started = false
    function boot() {
      if (started) return
      started = true
      var script = document.createElement('script')
      script.type = 'module'
      script.src = ${JSON.stringify(src)}
      document.body.appendChild(script)
    }

    window.addEventListener('load', boot)
    window.addEventListener('pointerdown', boot, { capture: true, passive: true })
    window.addEventListener('keydown', boot, { capture: true, passive: true })

    var afterPaint = function () {
      setTimeout(boot, 1000)
    }
    if (!window.PerformanceObserver) {
      afterPaint()
      return
    }
    try {
      new PerformanceObserver(function (list, observer) {
        list.getEntries().forEach(function (entry) {
          if (entry.name !== 'first-contentful-paint') return
          observer.disconnect()
          afterPaint()
        })
      }).observe({ type: 'paint', buffered: true })
    } catch (e) {
      afterPaint()
    }
  })()
</script>`
