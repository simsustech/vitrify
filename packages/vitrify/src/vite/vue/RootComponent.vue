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
import { onMounted } from 'virtual:vitrify-hooks'
import * as staticImports from 'virtual:static-imports'
import App from 'src/App.vue'
// import 'vitrify.sass'
const instance = getCurrentInstance()
const props = defineProps()

onMountedVue(async () => {
  for (let fn of onMounted) {
    await fn(instance, staticImports)
  }
})

const render = () => h(App, props)
</script>

<style></style>
<style lang="sass"></style>
