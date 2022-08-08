import type { Plugin } from 'vite'

// const read = (envVar: string) => {

// }

// let dockerRead = (secretName) => null
// if (import.meta.env.SSR) {
//   const { readFileSync } = await import('fs')
//   dockerRead = (secretName) => {
//     let secret
//     try {
//       secret = readFileSync(`/run/secrets/${secretName}`, 'utf-8')
//       return secret
//     } catch (e) {
//       console.error(`Unable to read secret ${secretName}`)
//     }
//   }
// }

// export const env = {
//   read: (envVar) => {
//     let result: string = process.env[envVar] || import.meta.env[envVar]
//     console.log(result)
//     if (result?.startsWith('/run/secrets')) result = dockerRead(envVar)
//     return result
//   }
// }

const VIRTUAL_MODULE_ID = 'virtual:env'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

const envPlugin = (): Plugin => {
  return {
    name: '@vitrify/plugin-env',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return `const env = { read: (envVar) => {
          let result = import.meta.env[envVar]
          if (!result && import.meta.env.SSR) {
            result = process.env[envVar]
          }
          if (result && result.startsWith('/run/secrets') && import.meta.env.SSR) {
            try {
              result = readFileSync('/run/secrets/' + result, 'utf-8')
            } catch (e) {
              try {
                result = readFileSync('/run/secrets/' + result + '_FILE', 'utf-8')
              } catch (e) {
                console.error('Unable to read Docker secret ' + result)
              }
            }
          }
          return result
        }};
        export default env`
      }
    }
  }
}

export default envPlugin
