import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserService} from "../../modules/user/services/user.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
import {Observable, timer} from "rxjs";
import {ApiService} from "../../modules/api/services/api.service";
import {Router} from "@angular/router";

function usernameIsNotTaken(apiService: ApiService) {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return timer(500).pipe(
        switchMap(() => apiService.usernameTaken(control.value)),
        tap(v => console.log(v, v === true)),
        map((res) => res ? {usernameIsTaken: true} : null)
    )
  };
}

@Component({
  selector: 'rh-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OauthComponent {

  public readonly signedInUser$ = this.userService.signedInUser$;

  public readonly form: FormGroup;
  public readonly usernameControl: FormControl;

  public constructor(private readonly userService: UserService,
                     private readonly fb: FormBuilder,
                     private readonly apiService: ApiService,
                     private readonly router: Router) {
    this.usernameControl = this.fb.control('', [Validators.required], [usernameIsNotTaken(apiService)]);

    this.form = this.fb.group({
      username: this.usernameControl
    });

    this.signedInUser$.pipe(
        filter((value => !!value)),
        take(1)
    )
        .subscribe((user) => {
          if (!user) {
            return;
          }

          this.form.patchValue({username: user.oauthClients[0].providerUsername + user.oauthClients[0].providerUserDiscriminator});
        });
  }

  onSubmitForm() {
    const username = this.usernameControl.value;

    this.apiService.changeUsername(username)
        .subscribe((res) => {
          this.userService.signedInUser$.next(res);

          if (res) {
            this.router.navigate(['/browser'])
          }
        });
  }

  onLogout() {
    this.userService.logout();
  }
}
