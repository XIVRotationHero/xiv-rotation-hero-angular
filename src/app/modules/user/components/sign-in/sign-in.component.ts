import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {environment} from "../../../../../environments/environment";

interface OAuthProvider {
  name: string,
  url: string,
  className: string
}

@Component({
  selector: 'rh-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  public readonly oauthProviders: OAuthProvider[] = [
    {
      name: 'Discord',
      className: 'discord',
      url: environment.apiBaseUrl + '/auth/provider/discord'
    }
  ];

  public readonly signInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public constructor(private readonly userService: UserService) {
  }

  public onSubmit(credentials: { email: string, password: string }) {
    this.userService.signInSubject$.next(credentials);
  }

  public signInWithProvider(provider: OAuthProvider): void {
    window.location.href = provider.url;
  }
}
