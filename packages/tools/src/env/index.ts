import { readFileSync } from 'fs'

const env = {
  read: (envVar: string) => {
    let result = import.meta.env[envVar]
    if (!result && import.meta.env.SSR) {
      result = process.env[envVar]
    }
    if (!result) {
      result = process.env[envVar + '_FILE']
    }
    if (result && result.startsWith('/run/secrets') && import.meta.env.SSR) {
      try {
        result = readFileSync(result, 'utf-8')
      } catch (e) {}
    }
    return result
  }
}
export default env
