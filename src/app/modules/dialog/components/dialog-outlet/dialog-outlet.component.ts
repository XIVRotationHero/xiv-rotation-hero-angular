import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'rh-dialog-outlet',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogOutletComponent implements AfterViewInit {

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly dialogService: DialogService
  ) {}

  public ngAfterViewInit() {
    this.dialogService.registerContainer(this.elementRef);
  }

}
