import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ConfigurationService} from "./services/configuration.service";
import {InputType} from "./enums/input-type";

@Component({
  selector: 'rh-configuration',
  templateUrl: './configuration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {
  public readonly InputType = InputType;

  public constructor(public readonly configurationService: ConfigurationService) {}
}
