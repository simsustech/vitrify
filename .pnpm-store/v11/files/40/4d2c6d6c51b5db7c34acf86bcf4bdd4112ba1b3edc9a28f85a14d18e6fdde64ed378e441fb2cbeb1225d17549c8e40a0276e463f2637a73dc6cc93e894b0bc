let lastKeyCompositionStatus = false

export function onKeyDownComposition(evt) {
  lastKeyCompositionStatus = evt.isComposing === true
}

export function shouldIgnoreKey(evt) {
  return (
    lastKeyCompositionStatus ||
    evt !== Object(evt) ||
    evt.isComposing ||
    evt.qKeyEvent
  )
}

export function isKeyCode(evt, keyCodes) {
  return !shouldIgnoreKey(evt) && [keyCodes].flat().includes(evt.keyCode)
}
