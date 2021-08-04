import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'rh-key-binding-dialog',
  templateUrl: './key-binding-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyBindingDialogComponent {

  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();

}
