import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HotbarConfigurationView} from '../../enums/hotbar-configuration-view';

@Component({
  selector: 'rh-hotbar-configuration',
  templateUrl: './hotbar-configuration.component.html',
  styleUrls: ['./hotbar-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotbarConfigurationComponent {
  public activeView: HotbarConfigurationView = HotbarConfigurationView.CrossHotbarSettings;

  public readonly HotbarConfigurationView = HotbarConfigurationView;
}
