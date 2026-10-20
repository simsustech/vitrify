import { describe, expect, it } from 'vitest'
import { analyticsTags, umamiTag } from '../src/node/helpers/analytics.js'

/**
 * The analytics tag, as the build produces it.
 *
 * These assertions are about the *served* HTML, which is why the cases are shaped
 * the way they are: a site with no website id must ship no tag at all (not a tag
 * with an empty attribute that a later build forgets to fix), and the tag a site
 * with an id gets must name only the instance it was configured with.
 */
describe('umamiTag', () => {
  it('produces nothing without a website id', () => {
    expect(umamiTag(undefined)).toBe('')
    expect(umamiTag({ websiteId: '', host: 'analytics.example.com' })).toBe('')
    expect(umamiTag({ websiteId: '   ', host: 'analytics.example.com' })).toBe(
      ''
    )
  })

  it('produces nothing without a host, even with an id', () => {
    // An id with nowhere to send it is a broken configuration, not a tag: a
    // `<script src="/script.js">` would ask this site's own server for a file.
    expect(umamiTag({ websiteId: 'abc', host: '' })).toBe('')
  })

  it('builds the tag from the configured host and id', () => {
    const tag = umamiTag({
      websiteId: 'abc-123',
      host: 'analytics.example.com'
    })

    expect(tag).toBe(
      '<script defer src="https://analytics.example.com/script.js" data-website-id="abc-123" data-do-not-track="true"></script>'
    )
  })

  it('accepts a host that already carries a scheme or a trailing slash', () => {
    for (const host of [
      'https://analytics.example.com',
      'https://analytics.example.com/',
      'analytics.example.com/'
    ]) {
      expect(umamiTag({ websiteId: 'abc', host })).toContain(
        'src="https://analytics.example.com/script.js"'
      )
    }
  })

  it('emits the domain list, which is what keeps a preview out of the numbers', () => {
    const tag = umamiTag({
      websiteId: 'abc',
      host: 'analytics.example.com',
      domains: ['example.com', 'www.example.com']
    })

    expect(tag).toContain('data-domains="example.com,www.example.com"')
  })

  it('omits the domains attribute when no list is configured', () => {
    const tag = umamiTag({ websiteId: 'abc', host: 'analytics.example.com' })

    expect(tag).not.toContain('data-domains')
  })

  it('honours doNotTrack: false, which is the only way to turn it off', () => {
    const tag = umamiTag({
      websiteId: 'abc',
      host: 'analytics.example.com',
      doNotTrack: false
    })

    expect(tag).not.toContain('data-do-not-track')
  })

  it('lets a renamed script be addressed', () => {
    const tag = umamiTag({
      websiteId: 'abc',
      host: 'analytics.example.com',
      scriptName: '/stats/umami.js'
    })

    expect(tag).toContain('src="https://analytics.example.com/stats/umami.js"')
  })

  it('escapes an id that would otherwise end the attribute', () => {
    // A website id is copied from a dashboard, not typed by an attacker — but a
    // config file is editable, and a quote in it must not produce two attributes.
    const tag = umamiTag({ websiteId: 'a"b<c', host: 'analytics.example.com' })

    expect(tag).toContain('data-website-id="a&quot;b&lt;c"')
  })
})

describe('analyticsTags', () => {
  it('is empty when no analytics is configured at all', () => {
    expect(analyticsTags(undefined)).toBe('')
    expect(analyticsTags({})).toBe('')
  })

  it('returns exactly the umami tag when umami is configured', () => {
    const analytics = {
      umami: { websiteId: 'abc', host: 'analytics.example.com' }
    }

    expect(analyticsTags(analytics)).toBe(umamiTag(analytics.umami))
  })
})
