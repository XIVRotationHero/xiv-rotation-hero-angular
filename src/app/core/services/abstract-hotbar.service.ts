import {combineLatest, Observable, Subject} from "rxjs";
import {filter, map, scan, shareReplay, startWith, switchMap, withLatestFrom} from "rxjs/operators";
import {Action} from "../../modules/actions/interfaces/action";
import {AppStateService} from "./app-state.service";
import {GameDataService} from "./game-data.service";

export abstract class AbstractHotbarService<T> {
  public hotbarAllocation$: Observable<T[]>;

  abstract get emptyHotbar(): T;

  private hotbarResetTrigger$: Subject<void> = new Subject();
  protected hotbarAllocationSubject$: Subject<[number, number, number | null]> = new Subject();

  protected constructor(
      protected appStateService: AppStateService,
      protected gameDataService: GameDataService,
      protected HOTBAR_ALLOCATION_PERSISTENCE_KEY: string,
      protected HOTBAR_COUNT: number,
      protected SLOT_COUNT: number
  ) {
    const currentClassJobAllocation$ = this.appStateService.currentClassJobId$.pipe(
        map(this.loadHotbarAllocation.bind(this)),
        shareReplay(1)
    );

    this.hotbarAllocation$ = combineLatest([this.hotbarResetTrigger$.pipe(startWith([])), currentClassJobAllocation$])
        .pipe(
            switchMap(([, allocation]) => this.hotbarAllocationSubject$.asObservable()
                .pipe(
                    scan((acc, [hotbarId, slotId, actionId]) => {
                      acc = this.allocateAction(acc, hotbarId, slotId, actionId);
                      return acc;
                    }, allocation),
                    startWith(allocation)
                )
            ),
            shareReplay(1)
        );

    // Persist hotbar allocation
    this.hotbarAllocation$
        .pipe(
            withLatestFrom(this.appStateService.currentClassJobId$),
            filter(([, currentClassJobId]) => currentClassJobId !== -1)
        )
        .subscribe(([hotbarAllocation, currentClassJobId]) => this.persistHotbarAllocation(currentClassJobId, hotbarAllocation));
  }

  protected abstract allocateAction(allocation: T[], hotbarId: number, slotId: number, actionId: number | null): T[];

  public assignAction(hotbarId: number, slotId: number, actionId: number | null) {
    this.hotbarAllocationSubject$.next([hotbarId, slotId, actionId]);
  }

  private loadHotbarAllocation(currentClassJobId: number): T[] {
    const existingHotbarData = localStorage.getItem(`${this.HOTBAR_ALLOCATION_PERSISTENCE_KEY}${currentClassJobId}`);

    if (currentClassJobId === -1) {
      return Array.from({length: this.HOTBAR_COUNT}).map(() => this.emptyHotbar);
    }

    if (existingHotbarData !== null) {
      return <T[]>JSON.parse(existingHotbarData);
    }

    const actions = this.gameDataService.getActionsByClassJobId(currentClassJobId);
    return this.autoAllocateActions(actions.filter((action) => {
      return !action.Description.match('※This action cannot be assigned to a hotbar');
    }));
  }

  private autoAllocateActions(actions: Action[]): T[] {
    let allocation: T[] = Array.from({length: this.HOTBAR_COUNT}).map(() => this.emptyHotbar);

    if (actions) {
      actions.forEach((action, index) => {
        const hotbarId = Math.floor(index / this.SLOT_COUNT);
        const slotId = index % this.SLOT_COUNT;
        allocation = this.allocateAction(allocation, hotbarId, slotId, action.ID);
      });
    }

    return allocation;
  }

  private persistHotbarAllocation(currentClassJobId: number, allocation: T[]) {
    localStorage.setItem(`${this.HOTBAR_ALLOCATION_PERSISTENCE_KEY}${currentClassJobId}`, JSON.stringify(allocation));
  }
}
