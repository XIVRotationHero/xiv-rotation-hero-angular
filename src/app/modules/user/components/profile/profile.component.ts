import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../../api/interfaces/user";

@Component({
  selector: 'rh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  @Input() user: User | null = null;

  constructor(private readonly userService: UserService) { }

  logout() {
    this.userService.signOutSubject$.next();
  }
}
