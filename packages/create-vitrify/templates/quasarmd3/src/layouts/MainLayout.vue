<template>
  <md3-layout :ready="ready">
    <template #header-toolbar>
      <q-toolbar-title> {{ title }} </q-toolbar-title>

      <q-btn icon="i-mdi-more-vert" flat>
        <q-menu>
          <q-list>
            <q-language-select
              v-model="language"
              :language-imports="languageImports"
              :locales="languageLocales"
              is-item
            />
            <q-item>
              <q-item-section label>
                {{ lang.darkMode }}
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="$q.dark.isActive"
                  checked-icon="i-mdi-moon-and-stars"
                  unchecked-icon="i-mdi-brightness-7"
                  size="2em"
                  @update:model-value="$q.dark.set"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>

    <template #drawer-mini-navigation>
      <div class="col">
        <navigation-tabs vertical dense />
      </div>
    </template>

    <template #drawer>
      <q-scroll-area class="fit">
        <div class="q-px-md">
          <div class="text-overline">{{ title }}</div>
          <q-list>
            <q-item to="/" exact>
              <q-item-section avatar>
                <q-icon color="primary" name="i-mdi-home" />
              </q-item-section>

              <q-item-section>Home</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </template>

    <template #footer>
      <div class="column fit items-center justify-center">
        <navigation-tabs dense class="col-12 lt-md" />
      </div>
    </template>

    <template #fabs="{ showSticky }">
      <router-view name="fabs" :show-sticky="showSticky" />
    </template>
  </md3-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { QLanguageSelect } from '@simsustech/quasar-components'
import { Md3Layout } from '@simsustech/quasar-components/md3'
import { useLang, loadLang } from '../lang/index.js'
import { loadLang as loadComponentsFormLang } from '@simsustech/quasar-components/form'
import NavigationTabs from './NavigationTabs.vue'

const lang = useLang()

const $q = useQuasar()

const language = ref($q.lang.isoName)

const title = ref('Quasar MD3')

const languageLocales = ref([
  {
    icon: 'i-flagpack-nl',
    isoName: 'nl'
  },
  {
    icon: 'i-flagpack-us',
    isoName: 'en-US'
  }
])

const languageImports = ref({
  nl: () => import(`quasar/lang/nl.js`),
  'en-US': () => import(`quasar/lang/en-US.js`)
})

if (lang.value.isoName !== $q.lang.isoName) loadLang($q.lang.isoName)
watch($q.lang, () => {
  loadLang($q.lang.isoName)
  loadComponentsFormLang($q.lang.isoName)
})

const ready = ref(false)
onMounted(async () => {
  if (__IS_PWA__) {
    await import('../pwa.js')
  }

  ready.value = true
})
</script>
