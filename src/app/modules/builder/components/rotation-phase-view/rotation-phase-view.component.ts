import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Phase} from "../../../api/enums/phase";
import {CdkDragDrop, copyArrayItem, moveItemInArray} from "@angular/cdk/drag-drop";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rh-rotation-phase-view',
  templateUrl: './rotation-phase-view.component.html',
  styleUrls: ['./rotation-phase-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationPhaseViewComponent {

  @Input() phase!: Phase;
  @Input() actions: number[] = [];
  @Input() isRecordEnabled = false;
  @Input() isRecording = false;

  @HostBinding('class.disabled')
  @Input() isDisabled = false;

  @Output() setAsRecordingTarget: EventEmitter<void> = new EventEmitter();
  @Output() updateActions: EventEmitter<number[]> = new EventEmitter();
  @Output() togglePhase: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.collapsed')
  public isCollapsed = false;

  public readonly faEye = faEye;
  public readonly faEyeSlash = faEyeSlash;

  public onDrop(event: CdkDragDrop<number[], any>): void {
    if (event.container !== undefined) {
      if (!event.isPointerOverContainer) {
        // Remove item
        event.container.data
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

      this.updateActions.emit(this.actions);
    }
  }

  public onRightClick(event: MouseEvent, actionIndex: number): void {
    event.preventDefault();
    this.updateActions.emit(
        [...this.actions.slice(0, actionIndex), ...this.actions.slice(actionIndex + 1)]
    );
  }

  public onDragEnd(event: any) {
    console.log(event);
  }
}
