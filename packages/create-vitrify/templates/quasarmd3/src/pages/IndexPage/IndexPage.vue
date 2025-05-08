<template>
  <q-page class="row items-center justify-evenly">
    <hello-world> </hello-world>
  </q-page>
</template>

<scirpt lang="ts">
export default {
  name: 'IndexPage'
}
</scirpt>

<script setup lang="ts">
import HelloWorld from '../../components/HelloWorld.vue'
</script>
