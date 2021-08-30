import {Component, EventEmitter, Output} from '@angular/core';
import {ApiService} from "../../../api/services/api.service";
import {PaginatedResponse} from "../../../api/interfaces/paginated-response";
import {Rotation} from "../../../api/interfaces/rotation";
import {BehaviorSubject, combineLatest, merge, Observable, Subject} from "rxjs";
import {RotationBrowserCategoryType} from "./enums/rotation-browser-category-type";
import {RotationBrowserSubCategoryType} from "./enums/rotation-browser-sub-category-type";
import {shareReplay, startWith, switchMap, withLatestFrom} from "rxjs/operators";
import {UserService} from "../../../user/services/user.service";

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
              case RotationBrowserCategoryType.Community:
              default:
                return this.apiService.getAllRotations({
                  page,
                  sortBy: subCategory
                });

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
            }

          }),
          shareReplay(1)
      );

  public readonly user$ = this.userService.signedInUser$;

  public readonly RotationBrowserCategoryType = RotationBrowserCategoryType;
  public readonly RotationBrowserSubCategoryType = RotationBrowserSubCategoryType;

  constructor(
      private readonly apiService: ApiService,
      private readonly userService: UserService
  ) {
  }

}
