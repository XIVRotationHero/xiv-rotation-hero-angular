import { Component, ChangeDetectionStrategy } from '@angular/core';
import {ActiveUserView} from "./enums/active-user-view";
import {UserService} from "./services/user.service";

@Component({
  selector: 'rh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

  public user$ = this.userService.signedInUser$;

  public activeView: ActiveUserView = ActiveUserView.SignIn;

  public readonly ActiveUserView = ActiveUserView;

  constructor(private readonly userService: UserService) { }

}
