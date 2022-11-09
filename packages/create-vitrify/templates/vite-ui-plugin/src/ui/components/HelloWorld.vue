<template>
  <div>
    {{ lang.helloWorld }}
    {{ iconSet.someIcon }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld'
}
</script>

<script setup lang="ts">
import { useIconSet } from '../icon-set'
import { useLang } from '../lang'

const lang = useLang()
const iconSet = useIconSet()
</script>
