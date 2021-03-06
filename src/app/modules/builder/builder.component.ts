import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Phase} from "../api/enums/phase";
import {RotationCreate} from "../api/interfaces/rotation-create";
import {ActionService} from "../actions/services/action.service";
import {RotationPhase} from "../api/interfaces/rotation-phase";
import {filter, take, takeUntil} from "rxjs/operators";
import {RotationService} from "../../core/services/rotation.service";
import {Rotation} from "../api/interfaces/rotation";
import {PublishState} from "../api/enums/publish-state";
import {DialogService} from "../dialog/services/dialog.service";
import {RotationHeroDialogConfiguration} from "../rotation-hero/rotation-hero-dialog-configuration";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/services/user.service";
import {AppStateService} from "../../core/services/app-state.service";

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
    phases: [
      {phase: Phase.PrePull, actions: []},
      {phase: Phase.Opener, actions: []},
      {phase: Phase.Cooldown, actions: []},
      {phase: Phase.Burst, actions: []}
    ]
  }

  public showMetaInfo = true;
  public isRecording = false;
  public recordEnabledPhase: RotationPhase = this.rotation.phases[0];
  public disabledPhases: Set<Phase> = new Set();

  public readonly form: FormGroup;
  public readonly currentUser$ = this.userService.signedInUser$;
  public readonly isDestroyed$: Subject<void> = new Subject();

  public constructor(
      private readonly actionService: ActionService,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly rotationService: RotationService,
      private readonly dialogService: DialogService,
      private readonly fb: FormBuilder,
      private readonly userService: UserService,
      private readonly appStateService: AppStateService
  ) {
    this.actionService.executedActionIds$
        .pipe(
            takeUntil(this.isDestroyed$),
            filter(() => this.isRecording)
        )
        .subscribe((actionId) => {
          this.recordEnabledPhase.actions = [...this.recordEnabledPhase.actions, actionId];
          this.changeDetectorRef.detectChanges();
        });

    this.form = this.fb.group({
      title: ['', [Validators.min(1)]],
      description: ['', [Validators.min(1)]],
    });

    this.resetRotation();
  }

  public ngOnDestroy() {
    this.isDestroyed$.next();
  }

  public tryRotation(): void {
    const rotation: Rotation = {
      ...this.rotation,
      id: '',
      createdAt: '',
      patch: '',
      favouriteCount: 0,
      publishState: PublishState.Unpublished,
      phases: this.rotation.phases.filter((phase) => !this.disabledPhases.has(phase.phase) && phase.actions.length !== 0),
      user: {
        id: 'NoUserId',
        username: 'NoUserName'
      }
    }

    this.dialogService.open(RotationHeroDialogConfiguration);
    this.rotationService.activeRotation$.next(rotation);
  }

  public resetRotation(): void {
    this.appStateService.currentClassJobId$.pipe(take(1)).subscribe((classJobId) => {
      this.rotation = {
        title: '',
        description: '',
        classJobId: classJobId,
        phases: [
          {phase: Phase.PrePull, actions: []},
          {phase: Phase.Opener, actions: []},
          {phase: Phase.Cooldown, actions: []},
          {phase: Phase.Burst, actions: []}
        ]
      }

      this.disabledPhases.clear();
      this.recordEnabledPhase = this.rotation.phases[0];
    });
  }

  public saveRotation(): void {
    let rotation: Rotation = {
      ...this.rotation,
      ...this.form.value
    }

    rotation.phases = rotation.phases.filter((phase) => !this.disabledPhases.has(phase.phase) && phase.actions.length !== 0);

    (rotation.id
            ? this.rotationService.updateRotation(rotation)
            : this.rotationService.saveRotation(rotation)
    ).subscribe(savedRotation => {
      this.rotation = savedRotation;
    });
  }

  public updatePhaseAction(phase: Phase, actions: number[]): void {
    const targetPhase = this.rotation.phases.find((rotationPhase) => rotationPhase.phase === phase);

    if (targetPhase) {
      targetPhase.actions = actions;
    }
  }

  public phaseType(index: number, phase: RotationPhase): string {
    return phase.phase;
  }

  public togglePhase(phase: Phase): void {
    this.disabledPhases.has(phase)
        ? this.disabledPhases.delete(phase)
        : this.disabledPhases.add(phase);
  }

}
