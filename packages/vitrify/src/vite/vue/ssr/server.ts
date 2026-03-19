import { setupApp } from './app'
import { hooks } from 'virtual:vitrify-hooks'

const app = await setupApp()

app.listen({
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || 'localhost'
})

export { hooks }
