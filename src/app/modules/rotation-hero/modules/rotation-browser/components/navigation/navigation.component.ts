import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RotationBrowserCategoryType} from "../../enums/rotation-browser-category-type";

@Component({
  selector: 'rh-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() public hasUser: boolean = false;
  @Input() public activeCategory: RotationBrowserCategoryType = RotationBrowserCategoryType.Community;

  @Output() public selectCategory: EventEmitter<RotationBrowserCategoryType> = new EventEmitter();

  public readonly RotationBrowserCategoryType = RotationBrowserCategoryType;
}
