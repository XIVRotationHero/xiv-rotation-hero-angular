import {Component, ElementRef, Input, OnChanges, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
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
  @Input() activeActionIndex!: number;

  @ViewChildren('action') actionElements!: QueryList<ElementRef>;

  public actions?: Action[];

  public readonly PhaseState = PhaseState;

  public readonly MARGIN = 16;

  public constructor(private readonly gameDataService: GameDataService) {}

  public get position() {
    const element = this.actionElements?.get(this.activeActionIndex)
    return element ? `-${element.nativeElement.offsetLeft - this.MARGIN }px` : 0;
  }

  public get doneActionCount() {
    switch (this.phaseState) {
      case PhaseState.Inactive: return 0;
      case PhaseState.Active: return this.activeActionIndex;
      case PhaseState.Done: return this.actionIds.length + 1;
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('actionIds')) {
      this.actions = this.actionIds.map(actionId => this.gameDataService.getActionById(actionId));
    }
  }

}
