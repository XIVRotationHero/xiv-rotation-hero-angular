import {DialogConfiguration} from "../dialog/services/dialog.service";
import {KeyBindingListComponent} from "./components/key-binding-list/key-binding-list.component";

export const KeyBindingDialogConfiguration: DialogConfiguration = {
  content: KeyBindingListComponent,
  title: 'Keybindings'
}
