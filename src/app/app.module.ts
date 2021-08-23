import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {communicationLayerServiceProvider} from "./modules/act/services/communication-layer.service.provider";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OverlayModule} from "@angular/cdk/overlay";
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from "@angular/material/tooltip";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatTooltipModule,
    FontAwesomeModule
  ],
  providers: [
    communicationLayerServiceProvider,
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: <MatTooltipDefaultOptions>{position: "above"}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
