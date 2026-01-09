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

## Playwright test

### Wayland

Check https://mcr.microsoft.com/en-us/artifact/mar/playwright/tags for the latest version.

```sh
docker run -e XDG_RUNTIME_DIR=/tmp -e WAYLAND_DISPLAY=$WAYLAND_DISPLAY -v $XDG_RUNTIME_DIR/$WAYLAND_DISPLAY:/tmp/$WAYLAND_DISPLAY --name playwright --net host --rm --init mcr.microsoft.com/playwright:v1.57.0 /bin/sh -c "cd /home/pwuser && npx -y playwright run-server --port 3333 --host 0.0.0.0"

cd packages/api
PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3333/ pnpm run test:e2e
```
