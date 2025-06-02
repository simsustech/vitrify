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
import { onAppMounted } from 'virtual:vitrify-hooks'
import App from 'src/App.vue'
// import 'vitrify.sass'
const instance = getCurrentInstance()
const props = defineProps()

onMountedVue(async () => {
  for (let fn of onAppMounted) {
    await fn({ instance })
  }
})

const render = () => h(App, props)
</script>

<style></style>
<style lang="sass"></style>
