import {Component} from '@angular/core';
import {DialogConfiguration, DialogService} from "../../modules/dialog/services/dialog.service";
import {ConfigurationService} from "../../modules/configuration/services/configuration.service";
import {InputType} from "../../modules/configuration/enums/input-type";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {

  public readonly InputType = InputType;

  public constructor(
      public readonly configurationService: ConfigurationService,
      private readonly dialogService: DialogService,
  ) {
  }

  public toggleDialog(dialogConfiguration: string | DialogConfiguration) {
    if (typeof dialogConfiguration !== 'string') {
      this.dialogService.toggle(dialogConfiguration);
    }
  }

  public isUserPanelVisible = false;
}
