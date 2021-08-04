import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {GameDataService} from "../../core/services/game-data.service";
import {ClassJob} from "../../core/interfaces/classJob";
import {AppStateService} from "../../core/services/app-state.service";
import {UserService} from "../user/services/user.service";

@Component({
  selector: 'rh-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  @Output()
  public readonly toggleDialog: EventEmitter<string> = new EventEmitter();

  @Output()
  public readonly toggleUserOverlay: EventEmitter<void> = new EventEmitter();

  public isUserPanelVisible = false;

  public readonly classJobs$ = this.gameDataService.classJobs$;
  public readonly currentClassJob$ = this.appStateService.currentClassJob$
  public readonly user$ = this.userService.signedInUser$;

  constructor(
    public readonly gameDataService: GameDataService,
    private readonly appStateService: AppStateService,
    private readonly userService: UserService
  ) {}

  public selectClassJob(job: ClassJob) {
    this.appStateService.selectClassJob(job.ID);
  }
}
