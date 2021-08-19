import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from "@angular/router";
import {OauthComponent} from "./oauth.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ApiService} from "../../modules/api/services/api.service";

@Injectable()
class IsOauthUserWithoutName implements CanActivate {
  public constructor(
      private readonly apiService: ApiService,
      private readonly router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiService.me()
        .pipe(
            map((user) => Boolean(user && user.isOAuthUser && user.username === null) ? true : this.router.createUrlTree(['/browser']))
        );
  }
}

const routes: Routes = [
  {
    path: '',
    component: OauthComponent,
    canActivate: [IsOauthUserWithoutName]
  }
];

@NgModule({
  declarations: [],
  providers: [
    IsOauthUserWithoutName
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OauthRoutingModule {
}
