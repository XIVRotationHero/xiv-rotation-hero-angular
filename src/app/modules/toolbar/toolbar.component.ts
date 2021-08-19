import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {GameDataService} from "../../core/services/game-data.service";
import {ClassJob} from "../../core/interfaces/classJob";
import {AppStateService} from "../../core/services/app-state.service";
import {UserService} from "../user/services/user.service";
import {DialogConfiguration} from "../dialog/services/dialog.service";
import {ActionsDialogConfiguration} from "../actions/actions-dialog-configuration";
import {RotationHeroDialogConfiguration} from "../rotation-hero/rotation-hero-dialog-configuration";
import {ConfigurationDialogConfiguration} from "../configuration/configuration-dialog-configuration";
import {BuilderDialogConfiguration} from "../builder/builder-dialog-configuration";
import {KeyBindingDialogConfiguration} from "../key-binding/key-binding-dialog-configuration";

@Component({
  selector: 'rh-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  @Output()
  public readonly toggleDialog: EventEmitter<string | DialogConfiguration> = new EventEmitter();

  @Output()
  public readonly toggleUserOverlay: EventEmitter<void> = new EventEmitter();

  public isUserPanelVisible = false;

  public readonly actionsDialogConfiguration = ActionsDialogConfiguration;
  public readonly rotationHeroDialogConfiguration = RotationHeroDialogConfiguration;
  public readonly layoutDialogConfiguration = ConfigurationDialogConfiguration;
  public readonly builderDialogConfiguration = BuilderDialogConfiguration;
  public readonly keybindingDialogConfiguration = KeyBindingDialogConfiguration;

  public readonly classJobs$ = this.gameDataService.classJobs$;
  public readonly currentClassJob$ = this.appStateService.currentClassJob$
  public readonly user$ = this.userService.signedInUser$;
  public readonly displayedUserName$ = this.userService.displayedUserName$;

  constructor(
      public readonly gameDataService: GameDataService,
      private readonly appStateService: AppStateService,
      private readonly userService: UserService
  ) {
  }

  public selectClassJob(job: ClassJob) {
    this.appStateService.selectClassJob(job.ID);
  }
}
