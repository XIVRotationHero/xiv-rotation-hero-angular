import {Component, EventEmitter, Output} from '@angular/core';
import {ApiService} from "../../../api/services/api.service";
import {PaginatedResponse} from "../../../api/interfaces/paginated-response";
import {Rotation} from "../../../api/interfaces/rotation";
import {BehaviorSubject, combineLatest, merge, Observable, Subject} from "rxjs";
import {RotationBrowserCategoryType} from "./enums/rotation-browser-category-type";
import {RotationBrowserSortMode} from "./enums/rotation-browser-sort-mode";
import {map, shareReplay, startWith, switchMap, withLatestFrom} from "rxjs/operators";
import {UserService} from "../../../user/services/user.service";
import {PublishState} from "../../../api/enums/publish-state";
import {RequestStatus} from "../../../api/enums/request-status";
import {FormControl} from "@angular/forms";
import {AppStateService} from "../../../../core/services/app-state.service";

@Component({
  selector: 'rh-rotation-browser',
  templateUrl: './rotation-browser.component.html',
  styleUrls: ['./rotation-browser.component.scss']
})
export class RotationBrowserComponent {

  @Output() selectRotation: EventEmitter<Rotation> = new EventEmitter();

  public readonly selectedCategorySubject$: BehaviorSubject<RotationBrowserCategoryType> =
      new BehaviorSubject<RotationBrowserCategoryType>(RotationBrowserCategoryType.Community);
  public readonly selectedSortModeSubject$: BehaviorSubject<RotationBrowserSortMode> =
      new BehaviorSubject<RotationBrowserSortMode>(RotationBrowserSortMode.Favorites);

  public readonly filterBySelectedRoleControl = new FormControl(false);

  public readonly selectPageSubject$: Subject<number> = new Subject();
  public readonly currentPage$ = merge(this.selectedCategorySubject$, this.selectedSortModeSubject$)
      .pipe(
          switchMap(() => this.selectPageSubject$.pipe(startWith(1))),
          shareReplay(1)
      )

  public readonly paginatedResponse$: Observable<PaginatedResponse<Rotation>> = combineLatest([
    this.selectedCategorySubject$,
    this.selectedSortModeSubject$,
    combineLatest([
        this.filterBySelectedRoleControl.valueChanges.pipe(startWith(false)),
        this.appStateService.currentClassJobId$
    ]).pipe(map(([ limitToRole, classJobId ]) => limitToRole ? classJobId : -1))
  ])
      .pipe(
          withLatestFrom(this.currentPage$),
          switchMap(([[category, sortBy, classJobId], page]) => {
            let queryParams = {
              page,
              sortBy,
              classJobId
            }

            switch (category) {
              case RotationBrowserCategoryType.Favourites:
                return this.apiService.userFavourites(queryParams);

              case RotationBrowserCategoryType.Mine:
                return this.apiService.userRotations(queryParams);

              case RotationBrowserCategoryType.Search:
                return this.apiService.getAllRotations(queryParams);

              case RotationBrowserCategoryType.Community:
              default:
                return this.apiService.getAllRotations(queryParams);
            }
          }),
          shareReplay(1)
      );

  public readonly currentUser$ = this.userService.signedInUser$;

  public readonly RotationBrowserSortMode = RotationBrowserSortMode;
  public readonly RequestStatus = RequestStatus;

  public rotationPendingPublish?: Rotation;
  public publishingRequestStatus: RequestStatus = RequestStatus.Idle;

  constructor(
      private readonly apiService: ApiService,
      private readonly appStateService: AppStateService,
      private readonly userService: UserService
  ) {
  }

  public showPublishDialog(rotation: Rotation) {
    this.publishingRequestStatus = RequestStatus.Idle;
    this.rotationPendingPublish = rotation;
  }

  public confirmPublish() {
    if (this.rotationPendingPublish) {
      const rotation = this.rotationPendingPublish;
      this.publishingRequestStatus = RequestStatus.InProgress;
      this.apiService.publishRotation(rotation.id)
          .subscribe(
              () => {
                this.publishingRequestStatus = RequestStatus.Success;
                rotation.publishState = PublishState.InReview;
              },
              () => {
                this.publishingRequestStatus = RequestStatus.Failure;
              });
    }
  }

  public cancelPublish() {
    this.rotationPendingPublish = undefined;
  }

}
