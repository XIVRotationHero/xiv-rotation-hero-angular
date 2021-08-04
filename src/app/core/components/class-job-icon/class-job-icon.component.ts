import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GameDataService} from "../../services/game-data.service";

@Component({
  selector: 'rh-class-job-icon',
  template: '<img *ngIf="src" [src]="src" />',
  styles: [ 'img { width: 100%; height: 100%; }' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassJobIconComponent {

  @Input() set classJobId(classJobId: number) {
    const classJob = this.gameDataService.getClassJob(classJobId);
    this.src = classJob ? `https://xivapi.com/${classJob.Icon}` : undefined;
  }

  public src?: string;

  constructor(private readonly gameDataService: GameDataService) {}

}
