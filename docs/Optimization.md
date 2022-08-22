## Side effects

If one of your dependencies has undesired side effects, re-export it in a virtual module and set `moduleSideEffects: false`in `resolveId()`.

## Quasar

An absolutely minimal setup of Quasar will result in a bundle size of approximately 440K (160K gzipped).

### Icons

Use SVG icons instead of webfonts, e.g.:

```vue
<template>
  <q-btn :icon="mdiMenu" />
</template>

<script setup lang="ts">
import { mdiMenu } from '@quasar/extras/mdi-v6'
</script>
```
