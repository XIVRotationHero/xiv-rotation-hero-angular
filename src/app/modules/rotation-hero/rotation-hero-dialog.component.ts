import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rh-rotation-hero-dialog',
  templateUrl: './rotation-hero-dialog.component.html',
  styleUrls: ['./rotation-hero-dialog.component.scss']
})
export class RotationHeroDialogComponent {

  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();

}
