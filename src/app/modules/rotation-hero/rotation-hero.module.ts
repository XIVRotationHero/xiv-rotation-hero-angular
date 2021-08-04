import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationHeroComponent } from './rotation-hero.component';
import {RotationBrowserModule} from "./modules/rotation-browser/rotation-browser.module";
import {RotationPlayerModule} from "./modules/rotation-player/rotation-player.module";
import { RotationHeroDialogComponent } from './rotation-hero-dialog.component';
import {DialogModule} from "../dialog/dialog.module";

@NgModule({
  declarations: [
    RotationHeroComponent,
    RotationHeroDialogComponent
  ],
  imports: [
    CommonModule,
    RotationBrowserModule,
    RotationPlayerModule,
    DialogModule
  ],
  exports: [
    RotationHeroComponent,
    RotationHeroDialogComponent
  ]
})
export class RotationHeroModule { }
