<template>
  <q-card>
    <q-card-section>
      <div class="row no-wrap items-center">
        <q-avatar square style="height: 300px; width: 300px">
          <img alt="Logo" :src="logo" />
        </q-avatar>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import logo from 'src/assets/quasar-logo-vertical.svg'
const name = 'HelloWorld'
</script>
