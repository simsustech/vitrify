const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
}

const directionList = Object.keys(modifiersAll)

modifiersAll.all = true

export function getModifierDirections(mod) {
  const dir = {}

  for (const direction of directionList) {
    if (mod[direction]) dir[direction] = true
  }

  if (Object.keys(dir).length === 0) return modifiersAll

  if (dir.horizontal) {
    dir.left = dir.right = true
  } else if (dir.left && dir.right) {
    dir.horizontal = true
  }

  if (dir.vertical) {
    dir.up = dir.down = true
  } else if (dir.up && dir.down) {
    dir.vertical = true
  }

  if (dir.horizontal && dir.vertical) {
    dir.all = true
  }

  return dir
}

// This is especially important (not the main reason, but important)
// for TouchSwipe directive running on Firefox
// because text selection on such elements cannot be determined
// without additional work (on top of getSelection() API)
// https://bugzilla.mozilla.org/show_bug.cgi?id=85686
const avoidNodeNamesList = ['INPUT', 'TEXTAREA']

export function shouldStart(evt, ctx) {
  return (
    ctx.event === void 0 &&
    evt.target !== void 0 &&
    !evt.target.draggable &&
    typeof ctx.handler === 'function' &&
    !avoidNodeNamesList.includes(evt.target.nodeName.toUpperCase()) &&
    (evt.qClonedBy === void 0 || !evt.qClonedBy.includes(ctx.uid))
  )
}
