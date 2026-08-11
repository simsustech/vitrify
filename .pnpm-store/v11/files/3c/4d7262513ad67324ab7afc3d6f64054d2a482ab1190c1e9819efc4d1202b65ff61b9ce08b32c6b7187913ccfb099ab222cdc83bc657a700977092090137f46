import { addFocusout, removeFocusout } from '../private.focus/focusout.js'

function fallback(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.contentEditable = 'true'
  area.style.position = 'fixed' // avoid scrolling to bottom

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  const fn = () => {}
  addFocusout(fn)

  document.body.append(area)
  area.focus()
  area.select()

  const res = document.execCommand('copy')

  area.remove()
  removeFocusout(fn)

  return res
}

export default function copyToClipboard(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text)

  const res = fallback(text)
  return res ? Promise.resolve(true) : Promise.reject(res)
}
