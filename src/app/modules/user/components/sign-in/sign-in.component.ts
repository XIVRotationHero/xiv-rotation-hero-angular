import { Component, ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'rh-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  public signInFormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required ])
  });

  public constructor(private readonly userService: UserService) {}

  public onSubmit(credentials: { email: string, password: string}) {
    this.userService.signInSubject$.next(credentials);
  }
}
