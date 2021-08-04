import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'rh-builder-dialog',
  templateUrl: './builder-dialog.component.html',
  styleUrls: ['./builder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderDialogComponent {

  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();
}
