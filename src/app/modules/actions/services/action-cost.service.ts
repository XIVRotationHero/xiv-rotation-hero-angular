import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {scan, share, shareReplay, startWith, switchMap, switchMapTo} from "rxjs/operators";
import {CostType} from "../enums/cost-type";

@Injectable({
  providedIn: 'root'
})
export class ActionCostService {

  public readonly resetCostSubject$ = new BehaviorSubject(undefined);
  public readonly resourcesSubject$: Subject<[ CostType, any ]> = new Subject();

  public readonly resources$: Observable<{ [key in CostType]: any }>;

  public constructor() {
    const resourceAccumulator = this.resourcesSubject$.pipe(
      scan(
        (acc, [ resourceId, value ]) => {
          const resourceValue: any = acc[ resourceId ];

          if (typeof value === 'number') {
            acc[ resourceId ] = <number>resourceValue + value
          }
          return acc;
        },
        <{ [ key in CostType ]: any }>{}
      ),
      startWith(<{ [key in CostType]: any }>{}),
      shareReplay(1)
    );

    this.resources$ = this.resetCostSubject$.pipe(
      switchMapTo(resourceAccumulator),
      shareReplay(1)
    );
  }
}
