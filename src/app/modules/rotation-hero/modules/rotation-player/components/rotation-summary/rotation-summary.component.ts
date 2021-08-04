import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Rotation} from "../../../../../api/interfaces/rotation";

@Component({
  selector: 'rh-rotation-summary',
  templateUrl: './rotation-summary.component.html',
  styleUrls: ['./rotation-summary.component.scss']
})
export class RotationSummaryComponent {
  @Input() rotation?: Rotation;

  @Output() changeRotation: EventEmitter<void> = new EventEmitter();
  @Output() toggleFavourite: EventEmitter<void> = new EventEmitter();
}
