import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Action} from "../../../modules/actions/interfaces/action";
import {GameDataService} from "../../services/game-data.service";

@Component({
  selector: 'rh-action-icon',
  template: '<img *ngIf="src" [src]="src" />',
  styles: [
    ':host { display: block }',
    'img { width: 100%; height: 100%; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionIconComponent {

  @Input() set actionId(actionId: number) {
    this.action = this.gameDataService.getActionById(actionId);
  }

  @Input() set action(action: Action) {
    this.src = action ? `https://xivapi.com/${action.IconHD}` : undefined;
  }

  public src?: string;

  constructor(private readonly gameDataService: GameDataService) {}

}
