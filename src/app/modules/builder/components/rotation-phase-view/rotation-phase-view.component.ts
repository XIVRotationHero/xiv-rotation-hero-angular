import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Phase} from "../../../api/enums/phase";
import {CdkDragDrop, copyArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'rh-rotation-phase-view',
  templateUrl: './rotation-phase-view.component.html',
  styleUrls: ['./rotation-phase-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationPhaseViewComponent {

  @Input() phase!: { phase: Phase, actions: number[] };

  @Output() updateActions: EventEmitter<number[]> = new EventEmitter();

  onDrop(event: CdkDragDrop<number[] | undefined, any>) {
    if (event.container !== undefined) {
      if (!event.isPointerOverContainer) {
        // Remove item
        return;
      }

      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data as number[], event.previousIndex, event.currentIndex);
      } else {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data as number[],
          event.previousIndex,
          event.currentIndex
        );
      }

      this.updateActions.emit(this.phase.actions);
    }
  }

  onDragEnd(event: any) {
    console.log(event);
  }
}
