import {Component, ChangeDetectionStrategy, EventEmitter, HostListener, Output} from '@angular/core';
import { ActiveUserView } from '../../enums/active-user-view';
import {Subject} from "rxjs";
import {UserService} from "../../services/user.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'rh-user-overlay',
  templateUrl: './user-overlay.component.html',
  styleUrls: ['./user-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOverlayComponent {
  public activeView: ActiveUserView = ActiveUserView.SignIn;
  public readonly ActiveUserView = ActiveUserView;

  @Output()
  public readonly closeOverlay: EventEmitter<void> = new EventEmitter();

  @HostListener('document:keydown.escape') onKeydownHandler() {
    this.closeOverlay.emit();
  }

  private readonly isDestroyed$ = new Subject();

  constructor(private readonly userService: UserService) {
    this.userService.signedInUser$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(() => {
        this.closeOverlay.next();
      });
  }

  public ngOnDestroy() {
    this.isDestroyed$.next();
  }
}
