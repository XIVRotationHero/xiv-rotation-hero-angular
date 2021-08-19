import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {User} from "../../../modules/api/interfaces/user";

@Component({
  selector: 'rh-oauth-provider-user-badge',
  templateUrl: './oauth-provider-user-badge.component.html',
  styleUrls: ['./oauth-provider-user-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OauthProviderUserBadgeComponent {

  @Input() public user!: User;

  @HostBinding('class')
  public provider: string = '';

  public ngOnChanges() {
    this.provider = this.user?.oauthClients[0].oauthProvider;
  }
}
