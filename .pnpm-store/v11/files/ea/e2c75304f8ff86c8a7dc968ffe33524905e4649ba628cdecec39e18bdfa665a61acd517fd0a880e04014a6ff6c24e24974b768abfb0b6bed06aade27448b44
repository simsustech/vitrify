import BottomSheet from './component/BottomSheetComponent.js'
import { createDialog } from '../../utils/private.dialog/create-dialog.js'

export default {
  install({ $q, parentApp }) {
    $q.bottomSheet = this.create = createDialog(BottomSheet, false, parentApp)
  }
}
