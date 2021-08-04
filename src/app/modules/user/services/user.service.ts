import { Injectable } from '@angular/core';
import {ApiService} from "../../api/services/api.service";
import {of, Subject} from "rxjs";
import {catchError, shareReplay, startWith, switchMap, switchMapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly signInSubject$: Subject<{ email: string, password: string }> = new Subject();
  public readonly signOutSubject$: Subject<void> = new Subject();

  public readonly signInRequests$ = this.signInSubject$.pipe(
    switchMap(({ email, password}) =>
      this.api.signIn(email, password)
        .pipe(catchError(() => of(null)))
    ),
    startWith(null)
  );

  public readonly signedInUser$ = this.signOutSubject$.pipe(
    startWith(null),
    switchMapTo(this.signInRequests$),
    shareReplay(1)
  );

  public constructor(private readonly api: ApiService) {
    this.signedInUser$.subscribe();
  }
}
