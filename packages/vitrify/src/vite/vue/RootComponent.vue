<template>
  <render></render>
</template>
<script setup lang="ts">
import {
  defineProps,
  h,
  onMounted as onMountedVue,
  getCurrentInstance
} from 'vue'
import { hooks } from 'virtual:vitrify-hooks'
import App from 'src/App.vue'
// import 'vitrify.sass'
const instance = getCurrentInstance()
const props = defineProps()

onMountedVue(async () => {
  if (hooks.onAppMounted) {
    for (let fn of hooks.onAppMounted) {
      await fn({ instance })
    }
  }
})

const render = () => h(App, props)
</script>

<style></style>
<style lang="sass"></style>
