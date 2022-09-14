declare module 'virtual:env' {
  export interface Environment {
    read: (envVar: string) => string
  }
  const env: Environment
  export default env
}
