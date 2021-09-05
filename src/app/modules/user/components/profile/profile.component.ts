import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../../api/interfaces/user";

@Component({
  selector: 'rh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  @Input() user!: User;

  @ViewChild('actUrlElement', {static: false}) public actUrlElement!: ElementRef;

  public actOverlayUrl: string = '';

  constructor(private readonly userService: UserService) {
  }

  ngOnChanges() {
    this.actOverlayUrl = `${window.location.origin}/player?token=${this.user.uniqueToken}`;
  }

  logout() {
    this.userService.signOutSubject$.next();
  }

  async copyUrlToClipboard() {
    const el = (<HTMLInputElement>this.actUrlElement.nativeElement);
    el.select();
    await navigator.clipboard.writeText(el.value);
  }
}
