import { setupApp } from './app'

const app = await setupApp()

app.listen({
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || 'localhost'
})
