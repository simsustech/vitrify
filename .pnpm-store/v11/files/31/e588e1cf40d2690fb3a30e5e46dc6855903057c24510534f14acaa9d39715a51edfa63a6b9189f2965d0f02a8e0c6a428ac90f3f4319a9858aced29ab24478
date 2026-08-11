import DialogPlugin from './component/DialogPluginComponent.js'
import { createDialog } from '../../utils/private.dialog/create-dialog.js'

export default {
  install({ $q, parentApp }) {
    $q.dialog = this.create = createDialog(DialogPlugin, true, parentApp)
  }
}
