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
import {BrowserComponent} from "./browser.component";
import {ApiService} from "../../modules/api/services/api.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
class IsLoggedOutOrHasUsername implements CanActivate {
  public constructor(
      private readonly apiService: ApiService,
      private readonly router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiService.me()
        .pipe(
            map((user) => Boolean(!user || user.username !== null) ? true : this.router.createUrlTree(['/oauth']))
        );
  }
}

const routes: Routes = [
  {
    path: '',
    component: BrowserComponent,
    canActivate: [IsLoggedOutOrHasUsername]
  }
]

@NgModule({
  declarations: [],
  providers: [IsLoggedOutOrHasUsername],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BrowserRoutingModule {
}
