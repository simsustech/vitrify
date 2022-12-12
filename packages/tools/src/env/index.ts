import { readFileSync } from 'fs'

const env = {
  read: (envVar: string) => {
    let result
    if (import.meta.env) {
      result = import.meta.env[envVar]
    }
    if (!result && process && process.env[envVar]) {
      result = process.env[envVar]
    } else if (!result && process && process.env[envVar + '_FILE']) {
      result = process.env[envVar + '_FILE']
    }
    if (result && result.startsWith('/run/secrets')) {
      try {
        result = readFileSync(result, 'utf-8')
      } catch (e) {}
    }

    return result
  }
}
export default env
