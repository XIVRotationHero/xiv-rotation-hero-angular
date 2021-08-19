import {Injectable} from '@angular/core';
import {ApiService} from "../../api/services/api.service";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {catchError, map, share, switchMap, take} from "rxjs/operators";
import {User} from "../../api/interfaces/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly signedInUser$: ReplaySubject<User | null> = new ReplaySubject(1);
  public readonly signInSubject$: Subject<{ email: string, password: string }> = new Subject();
  public readonly signOutSubject$: Subject<void> = new Subject();

  public readonly displayedUserName$: Observable<string> = this.signedInUser$
      .pipe(
          map((user) => {
            if (!user) {
              return '';
            }

            return user.username;
          })
      );

  private readonly signInRequests$ = this.signInSubject$.pipe(
      switchMap(({email, password}) =>
          this.api.signIn(email, password)
              .pipe(catchError(() => of(null)))
      )
  );

  private readonly signOutRequests$ = this.signOutSubject$.pipe(
      switchMap(() =>
          this.api.logout()
              .pipe(catchError(() => of(null)))
      ),
      share()
  )

  public constructor(private readonly api: ApiService,
                     private readonly router: Router) {
    this.signedInUser$.subscribe();
    this.signInRequests$.subscribe((user) => this.signedInUser$.next(user));
    this.signOutRequests$.subscribe(() => this.signedInUser$.next(null));

    this.loadCurrentUser();
  }

  public loadCurrentUser() {
    this.api.me().subscribe((user) => this.signedInUser$.next(user));
  }

  public logout() {
    this.signOutRequests$
        .pipe(
            take(1)
        )
        .subscribe(
            () => this.router.navigate(['/browser'])
        );

    this.signOutSubject$.next();
  }
}
