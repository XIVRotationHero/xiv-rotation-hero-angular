import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'rh-actions-dialog',
  templateUrl: './actions-dialog.component.html'
})
export class ActionsDialogComponent {

  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();

}
