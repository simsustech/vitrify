import { VitrifyContext } from 'vitrify'

export const render = async () => {
  console.log('Nothing to be rendered')
}

export async function run(args: VitrifyContext) {
  await render()
}
