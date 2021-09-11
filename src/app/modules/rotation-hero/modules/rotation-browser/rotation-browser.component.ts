import {Component, EventEmitter, Output} from '@angular/core';
import {ApiService} from "../../../api/services/api.service";
import {PaginatedResponse} from "../../../api/interfaces/paginated-response";
import {Rotation} from "../../../api/interfaces/rotation";
import {BehaviorSubject, combineLatest, merge, Observable, Subject} from "rxjs";
import {RotationBrowserCategoryType} from "./enums/rotation-browser-category-type";
import {RotationBrowserSubCategoryType} from "./enums/rotation-browser-sub-category-type";
import {map, shareReplay, startWith, switchMap, withLatestFrom} from "rxjs/operators";
import {UserService} from "../../../user/services/user.service";
import {PublishState} from "../../../api/enums/publish-state";
import {RequestStatus} from "../../../api/enums/request-status";

@Component({
  selector: 'rh-rotation-browser',
  templateUrl: './rotation-browser.component.html',
  styleUrls: ['./rotation-browser.component.scss']
})
export class RotationBrowserComponent {

  @Output() selectRotation: EventEmitter<Rotation> = new EventEmitter();

  public readonly selectedCategorySubject$: BehaviorSubject<RotationBrowserCategoryType> =
      new BehaviorSubject<RotationBrowserCategoryType>(RotationBrowserCategoryType.Community);
  public readonly selectedSubCategorySubject$: BehaviorSubject<RotationBrowserSubCategoryType> =
      new BehaviorSubject<RotationBrowserSubCategoryType>(RotationBrowserSubCategoryType.Favorites);

  public readonly PublishState = PublishState;

  public readonly selectPageSubject$: Subject<number> = new Subject();
  public readonly currentPage$ = merge(this.selectedCategorySubject$, this.selectedSubCategorySubject$)
      .pipe(
          switchMap(() => this.selectPageSubject$.pipe(startWith(1))),
          shareReplay(1)
      )

  public readonly paginatedResponse$: Observable<PaginatedResponse<Rotation>> = combineLatest([this.selectedCategorySubject$, this.selectedSubCategorySubject$])
      .pipe(
          withLatestFrom(this.currentPage$),
          switchMap(([[category, subCategory], page]) => {
            switch (category) {
              case RotationBrowserCategoryType.Favourites:
                return this.apiService.userFavourites({
                  page
                });

              case RotationBrowserCategoryType.Mine:
                return this.apiService.userRotations({
                  page
                });

              case RotationBrowserCategoryType.Search:
                return this.apiService.getAllRotations();

              case RotationBrowserCategoryType.Community:
              default:
                return this.apiService.getAllRotations({
                  page,
                  sortBy: subCategory
                });
            }

          }),
          shareReplay(1)
      );

  public readonly currentUser$ = this.userService.signedInUser$;
  public readonly currentUserId$ = this.currentUser$.pipe(map(user => user?.id));

  public readonly RotationBrowserCategoryType = RotationBrowserCategoryType;
  public readonly RotationBrowserSubCategoryType = RotationBrowserSubCategoryType;
  public readonly RequestStatus = RequestStatus;

  public rotationPendingPublish?: Rotation;
  public publishingRequestStatus: RequestStatus = RequestStatus.Idle;

  constructor(
      private readonly apiService: ApiService,
      private readonly userService: UserService
  ) {
  }

  public getPublishStateText(publishState: PublishState) {
    switch (publishState) {
      case PublishState.InReview: return 'In review';
      case PublishState.Rejected: return 'Rejected';
      case PublishState.Published: return 'Published';
      case PublishState.Unpublished: return 'Unpublished';
    }
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
