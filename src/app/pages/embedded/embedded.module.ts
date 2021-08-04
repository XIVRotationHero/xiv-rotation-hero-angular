import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbeddedComponent } from './embedded.component';
import { RotationHeroModule } from "../../modules/rotation-hero/rotation-hero.module";
import { EmbeddedRoutingModule } from "./embedded-routing.module";

@NgModule({
  declarations: [
    EmbeddedComponent
  ],
  imports: [
    CommonModule,
    RotationHeroModule,
    EmbeddedRoutingModule
  ]
})
export class EmbeddedModule { }
