import { Component } from '@angular/core';
import {GameDataService} from "../../../../core/services/game-data.service";
import {AppStateService} from "../../../../core/services/app-state.service";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Action} from "../../interfaces/action";
import {HotbarService} from "../../../hotbars/services/hotbar.service";

@Component({
  selector: 'rh-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent {

  public actions$: Observable<Action[]> = combineLatest([
    this.appStateService.currentClassJobId$,
    this.gameDataService.actionsByClassJobId$
  ])
    .pipe(
      map(([ classJobId, actionsByClassJobId]) => actionsByClassJobId[ classJobId ])
    );

  constructor(
    private readonly appStateService: AppStateService,
    private readonly gameDataService: GameDataService,
    private readonly hotbarService: HotbarService
  ) {}

  public noDrop() {
    return false;
  }

  public autoAssignActions() {
    this.hotbarService
  }
}
