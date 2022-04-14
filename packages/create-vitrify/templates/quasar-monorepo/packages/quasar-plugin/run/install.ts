import type { VitrifyContext } from 'vitrify'
import { render } from './render.js'

export async function run(args: VitrifyContext) {
  await render()
}
