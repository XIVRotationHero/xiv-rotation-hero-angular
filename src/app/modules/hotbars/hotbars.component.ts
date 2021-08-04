import { Component } from '@angular/core';
import {HotbarService} from "./services/hotbar.service";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HotbarOptions} from "./interfaces/hotbar-options";

@Component({
  selector: 'rh-hotbars',
  templateUrl: './hotbars.component.html',
  styleUrls: ['./hotbars.component.scss']
})
export class HotbarsComponent {
  public hotbars$: Observable<[HotbarOptions, (number|undefined)[]][]> = combineLatest([
    this.hotbarService.hotbarSettings$,
    this.hotbarService.hotbarAllocation$
  ]).pipe(
    map(([settings, allocation]) =>
      settings.map((options, index) => [ options, allocation[index] ])
    )
  );


  constructor(
    private readonly hotbarService: HotbarService
  ) {}

  public setHotbarPosition(hotbarId: number, position: [number, number]) {
    this.hotbarService.setHotbarPosition(hotbarId, position);
  }

  public hotbarIndex(index: number) {
    return index;
  }
}
