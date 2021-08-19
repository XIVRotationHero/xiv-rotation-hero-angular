import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OauthComponent} from './oauth.component';
import {OauthRoutingModule} from "./oauth-routing.module";
import {OauthProviderUserBadgeComponent} from './oauth-provider-user-badge/oauth-provider-user-badge.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    OauthComponent,
    OauthProviderUserBadgeComponent
  ],
  imports: [
    CommonModule,
    OauthRoutingModule,
    ReactiveFormsModule
  ]
})
export class OauthModule {
}
