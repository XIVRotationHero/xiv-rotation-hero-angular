import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {KeyCodeToCharMap} from "../../../key-binding/key-code-map";

@Component({
  selector: 'rh-keybinding-view',
  templateUrl: './keybinding-view.component.html',
  styleUrls: ['./keybinding-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeybindingViewComponent {

  @Input() public keybinding?: string;

  public needsControlKey = false;
  public needsAltKey = false;
  public needsShiftKey = false;
  public key?: string;

  public ngOnChanges() {
    this.needsControlKey = false;
    this.needsAltKey = false;
    this.needsShiftKey = false;
    this.key = undefined;

    if (!this.keybinding) {
      return;
    }

    const keys = this.keybinding.split('+');
    this.needsControlKey = keys.includes('Ctrl');
    this.needsAltKey = keys.includes('Alt');
    this.needsShiftKey = keys.includes('Shift');

    this.key = this.getLabelForKey(keys[keys.length - 1]);
  }

  private getLabelForKey(key: string): string {
    if (KeyCodeToCharMap[ key ] !== undefined) {
      return KeyCodeToCharMap[ key ];
    }

    return key;
  }
}
