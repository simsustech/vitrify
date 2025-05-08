<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <template #default>
        <component :is="Component" />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<script setup lang="ts">
import { provide } from 'vue'
import { EventBus, useQuasar } from 'quasar'
const $q = useQuasar()
const bus = new EventBus<{
  'index-add': () => void
}>()

bus.on('index-add', () =>
  $q.notify({
    message: 'Add button clicked'
  })
)

provide<EventBus>('bus', bus)
</script>
