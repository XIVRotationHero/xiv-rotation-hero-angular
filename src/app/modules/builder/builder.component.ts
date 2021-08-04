import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Phase} from "../api/enums/phase";
import {RotationCreate} from "../api/interfaces/rotation-create";

@Component({
  selector: 'rh-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderComponent {

  @Input() rotation: RotationCreate = {
    title: '',
    description: '',
    classJobId: -1,
    phases: []
  }

  public pendingRemovalPhase: Phase | null = null;

  public readonly availablePhases: Phase[] = [
    Phase.PrePull,
    Phase.Opener,
    Phase.Cooldown,
    Phase.Burst
  ];
  public readonly enabledPhases: Set<string> = new Set();

  public readonly Phase = Phase;

  public togglePhase(phase: Phase) {
    const targetPhase = this.rotation.phases.find((rotationPhase) => rotationPhase.phase === phase);

    if (targetPhase) {
      if (targetPhase.actions?.length) {
        this.pendingRemovalPhase = phase;
      } else {
        this.removePhase(phase);
      }
    } else {
      this.enabledPhases.add(phase);
      this.rotation.phases.push({ phase, actions: [] });
    }
  }

  public removePhase(phase: Phase) {
    const targetPhase = this.rotation.phases.find((rotationPhase) => rotationPhase.phase === phase);

    if (targetPhase) {
      const phaseIndex = this.rotation.phases.indexOf(targetPhase);
      this.rotation.phases = [...this.rotation.phases.slice(0, phaseIndex), ...this.rotation.phases.slice(phaseIndex + 1)];
      this.enabledPhases.delete(phase);
    }

    this.pendingRemovalPhase = null;
  }

  public updatePhaseAction(phase: Phase, actions: number[]) {
    const targetPhase = this.rotation.phases.find((rotationPhase) => rotationPhase.phase === phase);

    if (targetPhase) {
      const phaseIndex = this.rotation.phases.indexOf(targetPhase);
      this.rotation.phases = [
        ...this.rotation.phases.slice(0, phaseIndex),
        {
          phase,
          actions
        },
        ...this.rotation.phases.slice(phaseIndex + 1)
      ]
    }
  }

}
