import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from "rxjs";
import {GameDataService} from "./game-data.service";
import {ClassJob} from "../interfaces/classJob";
import {map} from "rxjs/operators";

export enum AppStateKey {
  SelectedClassJobID = 'rh-selected-class-job-id'
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public currentClassJobId$: Observable<number>;
  public currentClassJob$: Observable<ClassJob>;
  public loggedInUser$: Observable<any>;

  private currentClassJobSubject$: BehaviorSubject<number> = new BehaviorSubject(localStorage.getItem(AppStateKey.SelectedClassJobID) !== null ? Number(localStorage.getItem(AppStateKey.SelectedClassJobID)) : -1);
  private loggedInUserSubject$: ReplaySubject<any> = new ReplaySubject(1);

  constructor(
    private readonly gameDataService: GameDataService
  ) {
    this.currentClassJobId$ = this.currentClassJobSubject$.asObservable();
    this.loggedInUser$ = this.loggedInUserSubject$.asObservable();
    this.currentClassJob$ = combineLatest([this.currentClassJobId$, this.gameDataService.classJobsById$])
      .pipe(map(([ classJobId, classJobsById ]) => classJobsById.get(classJobId) as ClassJob))
  }

  public selectClassJob(jobId: number) {
    this.currentClassJobSubject$.next(jobId);
    localStorage.setItem(AppStateKey.SelectedClassJobID, jobId.toString());
  }

}
