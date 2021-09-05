import {Injectable} from '@angular/core';
import {HotbarOptions} from "../interfaces/hotbar-options";
import {HotbarStyle} from "../enums/hotbar-style.enum";
import {BehaviorSubject, Observable} from "rxjs";
import {take, tap} from "rxjs/operators";
import {GameDataService} from "../../../core/services/game-data.service";
import {KeyBindingService} from "../../key-binding/services/key-binding.service";
import {AppStateService} from "../../../core/services/app-state.service";
import {AbstractHotbarService} from "../../../core/services/abstract-hotbar.service";

type Allocation = number | null;
type HotbarAllocation = [
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation,
  Allocation
];

@Injectable({
  providedIn: 'root'
})
export class HotbarService extends AbstractHotbarService<HotbarAllocation> {
  public hotbarSettings$: Observable<HotbarOptions[]>;

  private static readonly HOTBAR_COUNT = 10;
  private static readonly SLOTS_PER_HOTBAR = 12;
  private static readonly HOTBAR_PERSISTENCE_KEY = 'rh-hotbar-allocation-';

  private readonly HOTBAR_SETTINGS_PERSISTENCE_KEY = 'rh-hotbar-settings';

  private HOTBAR_KEYS = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'KeyA',
    'KeyB'
  ];

  private readonly HOTBAR_DEFAULTS: HotbarOptions[] = [
    {visible: true, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.92], scale: .8},
    {visible: true, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.84], scale: .8},
    {visible: true, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.76], scale: .8},
    {visible: true, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.68], scale: .8},
    {visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.60], scale: .8},
    {visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.52], scale: .8},
    {visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.44], scale: .8},
    {visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.36], scale: .8},
    {visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.28], scale: .8},
    {visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [0.2, 0.20], scale: .8}
  ];

  private hotbarSettingsSubject$: BehaviorSubject<HotbarOptions[]> = new BehaviorSubject(this.loadSettings());

  public constructor(
      protected readonly appStateService: AppStateService,
      protected readonly gameDataService: GameDataService,
      private readonly keyBindingService: KeyBindingService
  ) {
    super(appStateService, gameDataService, HotbarService.HOTBAR_PERSISTENCE_KEY, HotbarService.HOTBAR_COUNT,  HotbarService.SLOTS_PER_HOTBAR);

    this.hotbarSettings$ = this.hotbarSettingsSubject$.asObservable()
        .pipe(tap(this.persistSettings.bind(this)));

    this.registerHotbarKeyBindingLabels();
  }

  public get emptyHotbar(): HotbarAllocation {
    return <HotbarAllocation>Array.from({ length: HotbarService.SLOTS_PER_HOTBAR }).fill(null);
  }

  public allocateAction(allocation: HotbarAllocation[], hotbarId: number, slotId: number, actionId: number | null): HotbarAllocation[] {
    allocation[hotbarId][slotId] = actionId;
    return allocation;
  }

  public updateHotbarOptions(hotbarOptions: HotbarOptions[]) {
    this.hotbarSettings$.pipe(
        take(1)
    ).subscribe((oldHotbarOptions) => {
      this.hotbarSettingsSubject$.next(hotbarOptions.map((newHotbarOptions, index) => {
        return {
          ...oldHotbarOptions[index],
          ...newHotbarOptions
        }
      }));
    });
  }

  public registerHotbarKeyBindingLabels() {
    // Register labels for hotbar slots
    for (let i = 0; i < HotbarService.HOTBAR_COUNT; i++) {
      for (let k = 0; k < 12; k++) {
        const label = `Hotbar ${i + 1} - Slot ${k + 1}`;
        this.keyBindingService.registerBindingLabel$.next(label);

        if (i === 0) {
          this.keyBindingService.registerBindingKey$.next([label, this.HOTBAR_KEYS[k]]);
        }
      }
    }

    // Register labels for hotbar switching
    for (let i = 0; i < this.HOTBAR_COUNT; i++) {
      const label = `Switch to Hotbar ${i + 1}`;
      this.keyBindingService.registerBindingLabel$.next(label);
    }
  }

  public getClearHotbars(): (number | null)[][] {
    return Array
        .from({length: this.HOTBAR_COUNT})
        .map(() => [...this.emptyHotbar]);
  }

  public clearHotbar(hotbarId: number) {
    this.hotbarAllocation$
        .pipe(take(1))
        .subscribe(() => {
          for (let slotId = 0; slotId < HotbarService.SLOTS_PER_HOTBAR; slotId++) {
            this.hotbarAllocationSubject$.next([hotbarId, slotId, null]);
          }
        });
  }

  /**
   * Swaps hotbar actions between to hotbar slots
   */
  public swapHotbarAllocations(sourceHotbarId: number, sourceSlotId: number, targetHotbarId: number, targetSlotId: number) {
    this.hotbarAllocation$
        .pipe(take(1))
        .subscribe((allocation) => {
          const sourceAction = allocation[sourceHotbarId][sourceSlotId];
          const targetAction = allocation[targetHotbarId][targetSlotId];

          this.hotbarAllocationSubject$.next([sourceHotbarId, sourceSlotId, targetAction]);
          this.hotbarAllocationSubject$.next([targetHotbarId, targetSlotId, sourceAction]);
        });
  }

  /**
   *
   */
  public setHotbarPosition(hotbarId: number, position: [number, number]) {
    this.hotbarSettings$
        .pipe(take(1))
        .subscribe((settings) => {
          const newSettings = [
            ...settings
          ];
          newSettings.splice(hotbarId, 1, {
            ...newSettings[hotbarId],
            position
          })
          this.hotbarSettingsSubject$.next(newSettings);
        });
  }

  private persistSettings(hotbarSettings: HotbarOptions[]) {
    localStorage.setItem(this.HOTBAR_SETTINGS_PERSISTENCE_KEY, JSON.stringify(hotbarSettings));
  }

  private loadSettings(): HotbarOptions[] {
    const savedSettings = localStorage.getItem(this.HOTBAR_SETTINGS_PERSISTENCE_KEY);

    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    return this.HOTBAR_DEFAULTS;
  }
}
