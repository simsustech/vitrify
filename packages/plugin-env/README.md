# @vitrify/plugin-env

Isomorphic environment variable retrieval.

Reads your environment variable in this order:

- `import.meta.env[envVar]`
- `process.env[envVar]`
  <br>If the environment variable contains a [Docker secret](https://docs.docker.com/engine/swarm/secrets/) path:
  - `/run/secrets/[envVar]`
  - `/run/secrets/[envVar + '_FILE']`

## Usage

In vite.config or vitrify.config:

```js
import envPlugin from '@vitrify/plugin-env'
...
plugins: [
  envPlugin()
]
```

In a JS file:

```js
import env from 'virtual:env'

console.log(env.read('MY_ENV_VAR'))
```
