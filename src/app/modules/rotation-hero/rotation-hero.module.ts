import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RotationHeroComponent} from './rotation-hero.component';
import {RotationBrowserModule} from "./modules/rotation-browser/rotation-browser.module";
import {RotationPlayerModule} from "./modules/rotation-player/rotation-player.module";
import {DialogModule} from "../dialog/dialog.module";

@NgModule({
  declarations: [
    RotationHeroComponent
  ],
  imports: [
    CommonModule,
    RotationBrowserModule,
    RotationPlayerModule,
    DialogModule
  ],
  exports: [
    RotationHeroComponent
  ]
})
export class RotationHeroModule { }
