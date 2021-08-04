import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import {RotationHeroModule} from "../../modules/rotation-hero/rotation-hero.module";
import {PlayerRoutingModule} from "./player-routing.module";

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    RotationHeroModule
  ]
})
export class PlayerModule { }
