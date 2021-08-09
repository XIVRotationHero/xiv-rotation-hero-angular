import { Injectable } from '@angular/core';
import {HotbarOptions} from "../interfaces/hotbar-options";
import {HotbarStyle} from "../enums/hotbar-style.enum";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {map, scan, shareReplay, startWith, switchMap, take, tap, withLatestFrom} from "rxjs/operators";
import {GameDataService} from "../../../core/services/game-data.service";
import {KeyBindingService} from "../../key-binding/services/key-binding.service";
import {AppStateService} from "../../../core/services/app-state.service";
import {HotbarAllocation} from "../interfaces/hotbar-allocation";
import {Action} from "../../actions/interfaces/action";

@Injectable({
  providedIn: 'root'
})
export class HotbarService {
  public hotbarSettings$: Observable<HotbarOptions[]>;
  public hotbarAllocation$: Observable<(number|undefined)[][]>;

  private readonly HOTBAR_SETTINGS_PERSISTANCE_KEY = 'hotbar-settings';
  private readonly HOTBAR_ALLOCATION_PERSISTANCE_KEY = 'hotbar-allocation-';
  private readonly HOTBAR_COUNT = 10;
  private readonly SLOTS_PER_HOTBAR = 12;
  private readonly EMPTY_HOTBAR: (number|undefined)[] = Array.from({ length: this.SLOTS_PER_HOTBAR }).map(() => undefined);

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
    { visible: true,  hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.92 ], scale: .8 },
    { visible: true,  hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.84 ], scale: .8 },
    { visible: true,  hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.76 ], scale: .8 },
    { visible: true,  hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.68 ], scale: .8 },
    { visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.60 ], scale: .8 },
    { visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.52 ], scale: .8 },
    { visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.44 ], scale: .8 },
    { visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.36 ], scale: .8 },
    { visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.28 ], scale: .8 },
    { visible: false, hotbarStyle: HotbarStyle.Horizontal, position: [ 0.2, 0.20 ], scale: .8 }
  ];

  private hotbarResetTrigger$: Subject<void> = new Subject();
  private hotbarAllocationSubject$: Subject<[number, number, number | undefined]> = new Subject();
  private hotbarSettingsSubject$: BehaviorSubject<HotbarOptions[]> = new BehaviorSubject(this.loadSettings());

  public constructor(
    private readonly appStateService: AppStateService,
    private readonly gameDataService: GameDataService,
    private readonly keyBindingService: KeyBindingService
  ) {
    const currentClassJobAllocation$ = this.appStateService.currentClassJobId$.pipe(
      map(this.loadHotbarAllocation.bind(this)),
      shareReplay(1)
    );

    this.hotbarSettings$ = this.hotbarSettingsSubject$.asObservable()
      .pipe(tap(this.persistSettings.bind(this)));

    this.hotbarAllocation$ = combineLatest([this.hotbarResetTrigger$.pipe(startWith([])), currentClassJobAllocation$])
      .pipe(
        switchMap(([, allocation]) => this.hotbarAllocationSubject$.asObservable()
          .pipe(
            scan((acc, [ hotbarId, slotId, actionId]) => {
              acc[hotbarId][slotId] = actionId;
              return acc;
            }, allocation),
            startWith(allocation)
          )
        ),
        shareReplay(1)
      );

    // Persist hotbar allocation
    this.hotbarAllocation$
      .pipe(withLatestFrom(this.appStateService.currentClassJobId$))
      .subscribe(([hotbarAllocation, currentClassJobId]) => this.persistHotbarAllocation(currentClassJobId, hotbarAllocation));

    this.registerHotbarKeyBindingLabels();
  }

  public updateHotbarOptions(hotbarOptions: HotbarOptions[]) {
    this.hotbarSettings$.pipe(
      take(1)
    ).subscribe((oldHotbarOptions) => {
      this.hotbarSettingsSubject$.next(hotbarOptions.map((newHotbarOptions, index) => {
        return {
          ...oldHotbarOptions[ index ],
          ...newHotbarOptions
        }
      }));
    });
  }

  public registerHotbarKeyBindingLabels() {
    for (let i=0; i<this.HOTBAR_COUNT; i++) {
      for (let k = 0; k < 12; k++) {
        const label = `Hotbar ${i + 1} - Slot ${k + 1}`;
        this.keyBindingService.registerBindingLabel$.next(label);

        if (i === 0) {
          this.keyBindingService.registerBindingKey$.next([label, this.HOTBAR_KEYS[k]]);
        }
      }
    }
  }

  public allocateAction(hotbarId: number, slotId: number, actionId: number | undefined) {
    this.hotbarAllocationSubject$.next([ hotbarId, slotId, actionId ]);
  }

  public getClearHotbars(): (number|undefined)[][] {
    return Array
        .from({ length: this.HOTBAR_COUNT })
        .map(() => [ ...this.EMPTY_HOTBAR ]);
  }

  public clearHotbar(hotbarId: number) {
    this.hotbarAllocation$
      .pipe(take(1))
      .subscribe(() => {
        for(let slotId=0; slotId<this.SLOTS_PER_HOTBAR; slotId++) {
          this.hotbarAllocationSubject$.next([ hotbarId, slotId, undefined ]);
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

        this.hotbarAllocationSubject$.next([ sourceHotbarId, sourceSlotId, targetAction]);
        this.hotbarAllocationSubject$.next([ targetHotbarId, targetSlotId, sourceAction]);
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
    localStorage.setItem(this.HOTBAR_SETTINGS_PERSISTANCE_KEY, JSON.stringify(hotbarSettings));
  }

  private loadSettings(): HotbarOptions[] {
    const savedSettings = localStorage.getItem(this.HOTBAR_SETTINGS_PERSISTANCE_KEY);

    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    return this.HOTBAR_DEFAULTS;
  }

  private loadHotbarAllocation(currentClassJobId: number): (number | undefined)[][] {
    const existingHotbarData = localStorage.getItem(`${this.HOTBAR_ALLOCATION_PERSISTANCE_KEY}${currentClassJobId}`);

    if (existingHotbarData !== null) {
      const hotbarAllocations = <HotbarAllocation>JSON.parse(existingHotbarData);
      return hotbarAllocations.hotbars;
    }

    const actions = this.gameDataService.getActionsByClassJobId(currentClassJobId);
    return this.autoAllocateActions(actions.filter((action) => {
      return !action.Description.match('※This action cannot be assigned to a hotbar');
    }));
  }

  private autoAllocateActions(actions: Action[]): (number | undefined)[][] {
    const allocation: (number|undefined)[][] = Array.from({ length: this.HOTBAR_COUNT }).map(() => [...this.EMPTY_HOTBAR]);

    if (actions) {
      actions.forEach((action, index) => {
        const hotbarId = Math.floor(index / 12);
        const slotId = index % 12;
        allocation[hotbarId][slotId] = action.ID;
      });
    }

    return allocation;
  }

  private persistHotbarAllocation(currentClassJobId: number, allocation: (number | undefined)[][]) {
    localStorage.setItem(`${this.HOTBAR_ALLOCATION_PERSISTANCE_KEY}${currentClassJobId}`, JSON.stringify({
      hotbars: allocation,
      crossHotbars: []
    }));
  }
}
