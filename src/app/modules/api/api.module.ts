import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from "./services/api.service";

@NgModule({
  providers: [
    ApiService
  ],
  imports: [
    CommonModule
  ]
})
export class ApiModule {

}
