import {Component} from '@angular/core';
import {HotbarService} from "./services/hotbar.service";
import {combineLatest, merge, Observable, Subject} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {HotbarOptions} from "./interfaces/hotbar-options";
import {ConfigurationService} from "../configuration/services/configuration.service";
import {KeyBindingService} from "../key-binding/services/key-binding.service";

@Component({
  selector: 'rh-hotbars',
  templateUrl: './hotbars.component.html',
  styleUrls: ['./hotbars.component.scss']
})
export class HotbarsComponent {
  public hotbars$: Observable<[HotbarOptions, (number | null)[]][]> = combineLatest([
    this.hotbarService.hotbarSettings$,
    this.hotbarService.hotbarAllocation$
  ]).pipe(
      map(([settings, allocation]) =>
          settings.map((options, index) => [options, allocation[index]])
      )
  );

  public hotbarDisplaySettings$ = this.configurationService.hotbarDisplaySettings$;

  public cycleSubject$: Subject<number> = new Subject();
  public activeHotbarCycleIndex$: Observable<number> = merge(
      this.cycleSubject$.asObservable().pipe(map((v) => v > -1 ? v % 10 : 9)),
      ...Array.from({length: 10}).map((v, i) =>
          this.keyBindingService.getBindingLabelStream(`Switch to Hotbar ${i + 1}`).pipe(map(() => i))
      )
  )
      .pipe(
          startWith(0)
      );
  public currentCycledHotbarAllocation$ = combineLatest([this.hotbars$, this.activeHotbarCycleIndex$])
      .pipe(map(([hotbarOptions, index]) => {
        return hotbarOptions[index][1];
      }))

  constructor(
      private readonly hotbarService: HotbarService,
      private readonly keyBindingService: KeyBindingService,
      private readonly configurationService: ConfigurationService
  ) {
  }

  public setHotbarPosition(hotbarId: number, position: [number, number]) {
    this.hotbarService.setHotbarPosition(hotbarId, position);
  }

  public onAllocateAction({hotbarId, slotId, actionId}: { hotbarId: number; slotId: number; actionId: number }) {
    this.hotbarService.assignAction(hotbarId, slotId, actionId);
  }

  public hotbarIndex(index: number) {
    return index;
  }
}
