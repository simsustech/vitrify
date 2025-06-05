<template>
  <q-tabs class="navigation-rail">
    <q-route-tab icon="i-mdi-home" to="/" label="Home" />
  </q-tabs>
</template>

<script setup lang="ts"></script>

<style scoped>
.navigation-rail:deep(.q-tab__content) {
  min-width: 52px;
}
.navigation-rail:deep(.q-tab__indicator) {
  color: var(--light-secondary-container);
  position: absolute;
  width: 52px;
  left: calc(50% - 26px);
  border-radius: 16px;
  height: 32px;
  top: calc(50% - 23px);
  min-height: unset;
}

.body--dark .navigation-rail:deep(.q-tab__indicator) {
  color: var(--dark-secondary-container);
}
</style>
