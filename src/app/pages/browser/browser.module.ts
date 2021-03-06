import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserComponent} from "./browser.component";
import {BrowserRoutingModule} from "./browser-routing.module";
import {ToolbarModule} from "../../modules/toolbar/toolbar.module";
import {HotbarsModule} from "../../modules/hotbars/hotbars.module";
import {RotationHeroModule} from "../../modules/rotation-hero/rotation-hero.module";
import {ActionsModule} from "../../modules/actions/actions.module";
import {KeyBindingModule} from "../../modules/key-binding/key-binding.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BuilderModule} from "../../modules/builder/builder.module";
import {ConfigurationModule} from "../../modules/configuration/configuration.module";
import {UserModule} from "../../modules/user/user.module";
import {DialogModule} from "../../modules/dialog/dialog.module";
import {CrossHotbarModule} from "../../modules/cross-hotbar/cross-hotbar.module";
import {HelpModule} from "../../modules/help/help.module";

@NgModule({
  declarations: [
    BrowserComponent
  ],
  imports: [
    CommonModule,
    BrowserRoutingModule,
    ToolbarModule,
    HotbarsModule,
    RotationHeroModule,
    ActionsModule,
    KeyBindingModule,
    DragDropModule,
    BuilderModule,
    ConfigurationModule,
    UserModule,
    DialogModule,
    CrossHotbarModule,
    HelpModule
  ]
})
export class BrowserModule {
}
