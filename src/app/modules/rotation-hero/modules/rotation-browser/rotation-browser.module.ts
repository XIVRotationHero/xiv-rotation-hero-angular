import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationBrowserComponent } from './rotation-browser.component';
import {CoreModule} from "../../../../core/core.module";
import { PaginationComponent } from './components/pagination/pagination.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RotationListComponent } from './components/rotation-list/rotation-list.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RotationBrowserComponent,
    PaginationComponent,
    NavigationComponent,
    RotationListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  exports: [
    RotationBrowserComponent
  ]
})
export class RotationBrowserModule { }
