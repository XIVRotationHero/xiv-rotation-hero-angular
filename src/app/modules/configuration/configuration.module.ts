import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationComponent} from './configuration.component';
import {DialogModule} from "../dialog/dialog.module";
import {ReactiveFormsModule} from "@angular/forms";
import { HotbarDisplaySettingsComponent } from './components/hotbar-display-settings/hotbar-display-settings.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    HotbarDisplaySettingsComponent
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
