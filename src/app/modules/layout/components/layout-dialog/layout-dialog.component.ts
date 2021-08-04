import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'rh-layout-dialog',
  templateUrl: './layout-dialog.component.html',
  styleUrls: ['./layout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDialogComponent {

  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();

}
