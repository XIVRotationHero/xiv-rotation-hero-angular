import {Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {PhaseState} from "../../enums/phase-state";
import {RotationPhase} from "../../../../../api/interfaces/rotation-phase";

@Component({
  selector: 'rh-phases-view',
  templateUrl: './phases-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhasesViewComponent {

  @Input() phases: RotationPhase[] = [];
  @Input() activePhaseIndex: number | null = null;
  @Input() activeActionIndex!: number;

  public readonly PhaseState = PhaseState;

}
