import type { VitrifyAnalyticsConfig } from '../vitrify-config.js'

/**
 * Analytics tags for the served HTML.
 *
 * The tag is produced here, once, at build time, from the config — not from a
 * component and not from a runtime check. That ordering is the point:
 *
 *   - a tag added by an `onMounted` exists only after the client bundle has run,
 *     so the first page view of a visitor on a slow connection is unmeasured, and
 *     a crawler never sees it at all;
 *   - an empty website id is a *build*-time fact, so a site without one ships no
 *     third-party request anywhere — no dead `<script>` waiting behind a guard.
 *
 * Umami is the first and currently only tool here. It stores nothing on the
 * visitor's device, which is what makes it usable without a consent banner; the
 * `analytics` object is shaped so a consent-gated tool can be added beside it as
 * a visibly different thing, rather than folded into "the analytics option".
 */

/** `analytics.example.com` → `https://analytics.example.com`. */
function normaliseHost(host: string): string {
  const trimmed = host.trim().replace(/\/+$/, '')

  if (!trimmed) return ''

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

/** Attribute values in HTML: escape what would end the tag. */
function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * The Umami `<script>` for this config, or an empty string.
 *
 * An empty string rather than `undefined`: the caller appends whatever comes back,
 * and the decision "no id means no tag" belongs in exactly one place.
 */
export function umamiTag(umami?: VitrifyAnalyticsConfig['umami']): string {
  if (!umami?.websiteId || !umami.websiteId.trim()) return ''

  const origin = normaliseHost(umami.host ?? '')
  if (!origin) return ''

  const src = `${origin}/${(umami.scriptName ?? 'script.js').replace(/^\/+/, '')}`
  const attributes = [
    'defer',
    `src="${escapeAttribute(src)}"`,
    `data-website-id="${escapeAttribute(umami.websiteId.trim())}"`
  ]

  if (umami.domains?.length) {
    attributes.push(
      `data-domains="${escapeAttribute(umami.domains.join(',').trim())}"`
    )
  }

  // `data-do-not-track` is on unless the caller turns it off: it costs nothing
  // and it honours a preference the visitor already expressed.
  if (umami.doNotTrack !== false) attributes.push('data-do-not-track="true"')

  return `<script ${attributes.join(' ')}></script>`
}

/**
 * Every analytics tag this config asks for, as one HTML fragment.
 *
 * Returned as a string (possibly empty) so the caller can append it to the head
 * without branching: `appendToHead(analyticsTags(config), html)`.
 */
export function analyticsTags(analytics?: VitrifyAnalyticsConfig): string {
  return umamiTag(analytics?.umami)
}
