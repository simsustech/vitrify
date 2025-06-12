# Functions vs files

There are two ways to add a hook to Vitrify: with a function or a file URL. The difference is that with a function, everything outside the function scope will not be accessible. For example:

```ts
import type { OnAppCreatedHook } from 'vitrify/hooks'
/**
 * Any imports outside of the function will not work
 */
const onAppCreated: OnAppCreatedHook = async ({
  app,
  ctx,
  initialState,
  ssrContext
}) => {
  const dep = await import('dep')
  console.log('You can only use dynamic imports when using functions')
}
```

If you have a complicated hook and need to import from other files or dependencies, you need to use a file URL:

```ts
// onAppCreated.ts
import type { OnAppCreatedHook } from 'vitrify/hooks'
import dep from 'dep'
const onAppCreated: OnAppCreatedHook = async ({
  app,
  ctx,
  initialState,
  ssrContext
}) => {
  console.log('The default export of this file is imported in Vitrify')
}

export default onAppCreated
```
