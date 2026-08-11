import { client } from '../platform/Platform.js'
import { getEmptyStorage, getStorage } from './engine/web-storage.js'

const storage =
  __QUASAR_SSR_SERVER__ || !client.has.webStorage
    ? getEmptyStorage()
    : getStorage('session')

const Plugin = {
  install({ $q }) {
    $q.sessionStorage = storage
  },
  ...storage
}

export default Plugin
