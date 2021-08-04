import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {GameDataService} from "../services/game-data.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameDataResolver implements Resolve<boolean> {
  constructor(private readonly gameDataService: GameDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.gameDataService.initialise().pipe(map(() => true));
  }
}
