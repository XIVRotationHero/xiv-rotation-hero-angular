import {Component} from '@angular/core';
import {DialogConfiguration, DialogService} from "../../modules/dialog/services/dialog.service";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  public constructor(private readonly dialogService: DialogService) {
  }

  public toggleDialog(dialogConfiguration: string | DialogConfiguration) {
    if (typeof dialogConfiguration !== 'string') {
      this.dialogService.toggle(dialogConfiguration);
    }
  }

  public isUserPanelVisible = false;
}
