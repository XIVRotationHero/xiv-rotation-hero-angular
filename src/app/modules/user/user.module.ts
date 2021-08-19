import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {UserOverlayComponent} from './components/user-overlay/user-overlay.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    UserOverlayComponent
  ],
  exports: [
    UserOverlayComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
