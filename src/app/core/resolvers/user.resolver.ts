import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from "../../modules/api/interfaces/user";
import {UserService} from "../../modules/user/services/user.service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | null> {
  public constructor(private readonly userService: UserService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null> {
    return this.userService.signedInUser$.pipe(take(1));
  }
}
