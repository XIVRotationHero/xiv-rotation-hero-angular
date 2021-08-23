import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

type SlotAllocation = number | null;
export type FullCrossHotbarAllocation = [
  SlotAllocation,
  SlotAllocation,
  SlotAllocation,
  SlotAllocation,
  SlotAllocation,
  SlotAllocation,
  SlotAllocation,
  SlotAllocation
];
export type HalfCrossHotbarAllocation = [
  SlotAllocation,
  SlotAllocation,
  SlotAllocation,
  SlotAllocation
];

@Component({
  selector: 'rh-cross-hotbar-set',
  templateUrl: './cross-hotbar-set.component.html',
  styleUrls: ['./cross-hotbar-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossHotbarSetComponent {
  @Input() public isActive = false;
  @Input() public hotbarId: [number, number] = [0, 0];
  @Input() public allocation!: FullCrossHotbarAllocation;
  @Input() public displayBothHalves = true;

  @Output() public onAssignSlot: EventEmitter<{ hotbarId: number, slotId: number, actionId: number }> = new EventEmitter();

  public displayedAllocation!: SlotAllocation[];

  public ngOnChanges() {
    this.displayedAllocation =
        this.displayBothHalves
            ? this.allocation
            : <HalfCrossHotbarAllocation>this.allocation.slice(0, 4);
  }

  public onDropHandler(dropEvent: { hotbarId: number, slotId: number, actionId: number }) {
    this.onAssignSlot.emit(dropEvent);
  }
}
