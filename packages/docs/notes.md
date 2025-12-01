# Notes

- If you get strange typescript errors, make sure all packages throughout your monorepo are the same version.
- Delete node_modules/.vite when things don't work when they should.

## SSR

- Use SSR development mode to find hydration errors.
- Do not use beforeEach route guards when the state differs between server and client (e.g. client side login).
- Do not use async setup functions in MainLayout/QLayout.
- gzip the generated files.

## pnpm

### Deploy

- Cannot set properties of null (setting 'peer'): circular dependency in a monorepo

## npm-check-updates

Update all packages in a monorepo:

```sh
ncu -u --dep prod,optional,dev,peer --packageFile './packages/**/package.json'
```
