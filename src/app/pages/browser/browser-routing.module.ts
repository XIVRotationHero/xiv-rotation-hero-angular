import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BrowserComponent} from "./browser.component";

const routes: Routes = [
  {
    path: '',
    component: BrowserComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BrowserRoutingModule { }
