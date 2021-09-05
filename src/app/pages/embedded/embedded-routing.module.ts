import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmbeddedComponent} from "./embedded.component";

const routes: Routes = [
  {
    path: '',
    component: EmbeddedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class EmbeddedRoutingModule { }
