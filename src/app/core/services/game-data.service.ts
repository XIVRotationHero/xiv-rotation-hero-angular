import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, of, ReplaySubject} from "rxjs";
import {map, shareReplay, tap} from "rxjs/operators";
import {Action} from "../../modules/actions/interfaces/action";
import {ActionIndirection} from "../interfaces/action-indirection";
import {ClassJob} from "../interfaces/classJob";

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  public classJobs$: Observable<ClassJob[]>;
  public classJobsById$: Observable<Map<number, ClassJob>>;
  public actionsByClassJobId$: Observable<{ [ classJobId: string ]: Action[] }>;
  public actionsById$: Observable<{ [ actionId: string ]: Action }>;

  private actionsById: { [ actionId: number ]: Action } = {};
  private actionsByClassJob: { [ classJobId: string ]: Action[] } = {};
  private actionIndirectionsById: { [ actionId: number ]: ActionIndirection } = {};
  private classJobs: ClassJob[] = [];
  private classJobsById: Map<number, ClassJob> = new Map();

  private classJobsSubject$: ReplaySubject<ClassJob[]> = new ReplaySubject(1);
  private actionsByClassJobIdSubject$: ReplaySubject<{ [ classJobId: string ]: Action[] }> = new ReplaySubject(1);

  constructor(private readonly httpClient: HttpClient) {
    this.classJobs$ = this.classJobsSubject$.asObservable()
        .pipe(map((jobs) => jobs.filter((job => job.BattleClassIndex > 0))));
    this.classJobsById$ = this.classJobs$
        .pipe(map((jobs) => jobs.reduce((acc, job) => (acc.set(job.ID, job), acc), new Map<number, ClassJob>())));

    this.actionsByClassJobId$ = this.actionsByClassJobIdSubject$.asObservable();

    this.actionsById$ = this.actionsByClassJobId$.pipe(
      map((actions) => Object.values(actions).flat().reduce(
        (acc, action) => {
          acc[action.ID] = action;
          return acc;
      }, <{ [ actionId: string ]: Action }>{})),
      shareReplay(1)
    );
  }

  initialise() {
    return forkJoin([
      (<Observable<{ [classJobId: string]: Action[] }>>this.httpClient.get('./assets/classjobactions.json'))
        .pipe(tap(this.registerActions.bind(this))),
      (<Observable<ActionIndirection[]>>this.httpClient.get('./assets/actionindirections.json'))
        .pipe(tap(this.registerActionIndirections.bind(this))),
      (<Observable<ClassJob[]>>this.httpClient.get('./assets/classjobs.json'))
        .pipe(tap((classJobs) => {
          this.classJobs = classJobs;
          this.classJobsSubject$.next(classJobs);
          classJobs.forEach((job) => {
            this.classJobsById.set(job.ID, job);
          })
        }))
    ]);
  }

  getActionById(id: number) {
    return this.actionsById[ id ];
  }

  getActionsByClassJobId(classJobId: number) {
    return this.actionsByClassJob[ classJobId ];
  }

  getActionIndirectionById(id: number) {
    return this.actionIndirectionsById[ id ];
  }

  getActionIndirectionsByClassJobId(classJobId: number) {
    const classJob = this.classJobsById.get(classJobId);
    if (!classJob || !classJob.GameContentLinks.ActionIndirection) return [];

    return classJob.GameContentLinks.ActionIndirection.ClassJob.map((actionIndirection) => this.actionIndirectionsById[ actionIndirection ]);
  }

  getClassJobs() {
    return this.classJobs;
  }

  getClassJob(classJobID: number): ClassJob | undefined {
    return this.classJobsById.get(classJobID);
  }

  getClassJobIcon(classJobID: number) {
    const classJob = this.getClassJob(classJobID);

    return classJob ? classJob.Icon : classJob
  }

  getClassJobAbbreviation(classJobID: number) {
    const classJob = this.getClassJob(classJobID);

    return classJob ? classJob.Abbreviation : classJob;
  }

  private registerActions(actions: { [ classJobId: string ]: Action[] }): void {
    this.actionsByClassJobIdSubject$.next(actions);
    this.actionsByClassJob = actions;

    Object.values(actions).flat().forEach((action) => {
      this.actionsById[ action.ID ] = action;
    });
  }

  private registerActionIndirections(actionIndirections: ActionIndirection[]): void {
    Object.values(actionIndirections).forEach((action) => {
      this.actionIndirectionsById[ action.ID ] = action;
    });
  }
}
