import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationComponent} from './configuration.component';
import {DialogModule} from "../dialog/dialog.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HotbarDisplaySettingsComponent} from './components/hotbar-display-settings/hotbar-display-settings.component';
import {CrossHotbarSettingsComponent} from './components/cross-hotbar-settings/cross-hotbar-settings.component';
import {CustomHotbarSettingsComponent} from './components/custom-hotbar-settings/custom-hotbar-settings.component';
import {HotbarConfigurationComponent} from './components/hotbar-configuration/hotbar-configuration.component';
import { InputTypeToggleComponent } from './components/input-type-toggle/input-type-toggle.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    HotbarDisplaySettingsComponent,
    CrossHotbarSettingsComponent,
    CustomHotbarSettingsComponent,
    HotbarConfigurationComponent,
    InputTypeToggleComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule
  ],
  exports: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule {
}
