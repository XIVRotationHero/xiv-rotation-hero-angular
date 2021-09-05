import { Injectable } from '@angular/core';
import {AbstractHotbarService} from "../../../core/services/abstract-hotbar.service";
import {AppStateService} from "../../../core/services/app-state.service";
import {GameDataService} from "../../../core/services/game-data.service";

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

@Injectable({
  providedIn: 'root'
})
export class CrossHotbarService extends AbstractHotbarService<[FullCrossHotbarAllocation, FullCrossHotbarAllocation]>{
  private static readonly SLOTS_PER_CROSS_HOTBAR_SIDE = 8;
  private static readonly HOTBAR_COUNT = 8;
  private static readonly HOTBAR_PERSISTENCE_KEY = 'rh-cross-hotbar-allocation-';

  get emptyHotbar(): [FullCrossHotbarAllocation, FullCrossHotbarAllocation] {
    return [
      <FullCrossHotbarAllocation>Array.from({length: CrossHotbarService.SLOTS_PER_CROSS_HOTBAR_SIDE}).fill(null),
      <FullCrossHotbarAllocation>Array.from({length: CrossHotbarService.SLOTS_PER_CROSS_HOTBAR_SIDE}).fill(null)
    ];
  }

  constructor(
      protected readonly appStateService: AppStateService,
      protected readonly gameDataService: GameDataService
  ) {
    super(appStateService, gameDataService, CrossHotbarService.HOTBAR_PERSISTENCE_KEY, CrossHotbarService.HOTBAR_COUNT, CrossHotbarService.SLOTS_PER_CROSS_HOTBAR_SIDE * 2);
  }

  protected allocateAction(allocation: [FullCrossHotbarAllocation, FullCrossHotbarAllocation][], hotbarId: number, slotId: number, actionId: number | null): [FullCrossHotbarAllocation, FullCrossHotbarAllocation][] {
    allocation[hotbarId][Math.floor(slotId / CrossHotbarService.SLOTS_PER_CROSS_HOTBAR_SIDE)][slotId % CrossHotbarService.SLOTS_PER_CROSS_HOTBAR_SIDE] = actionId;
    return allocation;
  }
}
