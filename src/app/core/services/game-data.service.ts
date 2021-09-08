import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, ReplaySubject} from "rxjs";
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
  public actionsByClassJobId$: Observable<{ [classJobId: string]: Action[] }>;
  public actionsById$: Observable<{ [actionId: string]: Action }>;

  private actionsById: { [actionId: number]: Action } = {};
  private actionsByClassJob: { [classJobId: string]: Action[] } = {};
  private actionIndirectionsById: { [actionId: number]: ActionIndirection } = {};
  private classJobs: ClassJob[] = [];
  private classJobsById: Map<number, ClassJob> = new Map();

  private classJobsSubject$: ReplaySubject<ClassJob[]> = new ReplaySubject(1);
  private actionsByClassJobIdSubject$: ReplaySubject<{ [classJobId: string]: Action[] }> = new ReplaySubject(1);

  public constructor(private readonly httpClient: HttpClient) {
    this.classJobs$ = this.classJobsSubject$.asObservable()
        .pipe(map((jobs) => jobs.filter((job => job.BattleClassIndex > 0))));
    this.classJobsById$ = this.classJobs$
        .pipe(
            map((jobs) => jobs.reduce((acc, job) => { acc.set(job.ID, job); return acc; }, new Map<number, ClassJob>()))
        );

    this.actionsByClassJobId$ = this.actionsByClassJobIdSubject$.asObservable();

    this.actionsById$ = this.actionsByClassJobId$.pipe(
        map((actions) => Object.values(actions).flat().reduce(
            (acc, action) => {
              acc[action.ID] = action;
              return acc;
            }, <{ [actionId: string]: Action }>{})),
        shareReplay(1)
    );
  }

  public initialise(): Observable<any> {
    return forkJoin([
      this.httpClient.get<{ [classJobId: string]: Action[] }>('./assets/classjobactions.json')
          .pipe(tap(this.registerActions.bind(this))),
      this.httpClient.get<ActionIndirection[]>('./assets/actionindirections.json')
          .pipe(tap(this.registerActionIndirections.bind(this))),
      this.httpClient.get<ClassJob[]>('./assets/classjobs.json')
          .pipe(tap((classJobs) => {
            this.classJobs = classJobs;
            this.classJobsSubject$.next(classJobs);
            classJobs.forEach((job) => {
              this.classJobsById.set(job.ID, job);
            })
          }))
    ]);
  }

  public getActionById(id: number): Action {
    return this.actionsById[id];
  }

  public getActionsByClassJobId(classJobId: number): Action[] {
    const actions = this.actionsByClassJob[classJobId];

    return actions.length ? actions : [];
  }

  public getActionIndirectionById(id: number): ActionIndirection {
    return this.actionIndirectionsById[id];
  }

  public getActionIndirectionsByClassJobId(classJobId: number): ActionIndirection[] {
    const classJob = this.classJobsById.get(classJobId);
    if (!classJob || !classJob.GameContentLinks.ActionIndirection) return [];

    return classJob.GameContentLinks.ActionIndirection.ClassJob.map((actionIndirection) => this.actionIndirectionsById[actionIndirection]);
  }

  public getClassJobs(): ClassJob[] {
    return this.classJobs;
  }

  public getClassJob(classJobID: number): ClassJob | undefined {
    return this.classJobsById.get(classJobID);
  }

  public getClassJobIcon(classJobID: number) {
    const classJob = this.getClassJob(classJobID);

    return classJob ? classJob.Icon : classJob
  }

  public getClassJobAbbreviation(classJobID: number): string {
    const classJob = this.getClassJob(classJobID);

    return classJob ? classJob.Abbreviation : '';
  }

  private registerActions(actions: { [classJobId: string]: Action[] }): void {
    this.actionsByClassJobIdSubject$.next(actions);
    this.actionsByClassJob = actions;

    Object.values(actions).flat().forEach((action) => {
      this.actionsById[action.ID] = action;
    });
  }

  private registerActionIndirections(actionIndirections: ActionIndirection[]): void {
    Object.values(actionIndirections).forEach((action) => {
      this.actionIndirectionsById[action.ID] = action;
    });
  }
}
