<template>
  <navigation-rail-fabs
    :bus-emits="busEmits"
    :icons="icons"
    :seek-attention="!customer"
    type="add"
  />
</template>

<script lang="ts" setup>
import { NavigationRailFabs } from '@simsustech/quasar-components/md3'
import { ref } from 'vue'

const busEmits = ref({
  add: 'index-add'
})

const icons = ref({
  add: 'i-mdi-add'
})
</script>
