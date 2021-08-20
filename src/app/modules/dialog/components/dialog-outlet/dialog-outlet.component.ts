import {AfterViewInit, ChangeDetectionStrategy, Component, ViewContainerRef} from '@angular/core';
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'rh-dialog-outlet',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogOutletComponent implements AfterViewInit {

  public constructor(
      private readonly viewContainerRef: ViewContainerRef,
      private readonly dialogService: DialogService
  ) {
  }

  public ngAfterViewInit() {
    this.dialogService.registerContainer(this.viewContainerRef);
  }

}
