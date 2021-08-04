import {Component, EventEmitter, Input, Output } from '@angular/core';
import {ClassJob} from "../../../../core/interfaces/classJob";

@Component({
  selector: 'rh-class-job-selection',
  templateUrl: './class-job-selection.component.html',
  styleUrls: ['./class-job-selection.component.scss']
})
export class ClassJobSelectionComponent {
  @Input() public classJobs: ClassJob[] | null = null;
  @Input() public currentClassJob: ClassJob | null = null;

  @Output() public selectClassJob: EventEmitter<ClassJob> = new EventEmitter();

  public isExpanded = false;

  public onSelectClassJob(classJob: ClassJob) {
    this.isExpanded = false;
    this.selectClassJob.emit(classJob);
  }
}
