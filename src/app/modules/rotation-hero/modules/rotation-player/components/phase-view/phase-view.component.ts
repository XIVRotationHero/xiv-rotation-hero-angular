import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Phase} from "../../../../../api/enums/phase";
import {GameDataService} from "../../../../../../core/services/game-data.service";
import {Action} from "../../../../../actions/interfaces/action";
import {PhaseState} from "../../enums/phase-state";

@Component({
  selector: 'rh-phase-view',
  templateUrl: './phase-view.component.html',
  styleUrls: ['./phase-view.component.scss']
})
export class PhaseViewComponent implements OnChanges {

  @Input() phase?: Phase;
  @Input() actionIds: number[] = [];
  @Input() phaseState: PhaseState = PhaseState.Inactive;
  @Input() activeActionIndex: number | null = null;

  public actions?: Action[];

  public constructor(private readonly gameDataService: GameDataService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('actionIds')) {
      this.actions = this.actionIds.map(actionId => this.gameDataService.getActionById(actionId));
    }
  }

}
