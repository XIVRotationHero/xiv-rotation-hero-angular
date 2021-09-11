import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {PublishState} from "../../../../../api/enums/publish-state";
import {Rotation} from "../../../../../api/interfaces/rotation";
import {User} from "../../../../../api/interfaces/user";

@Component({
  selector: 'rh-rotation-list',
  templateUrl: './rotation-list.component.html',
  styleUrls: ['./rotation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationListComponent {

  @Input() rotations!: Rotation[];
  @Input() currentUser?: User | null;

  @Output() selectRotation: EventEmitter<Rotation> = new EventEmitter();
  @Output() publishRotation: EventEmitter<Rotation> = new EventEmitter();
  @Output() favouriteRotation: EventEmitter<Rotation> = new EventEmitter();

  public readonly PublishState = PublishState;

  public getPublishStateText(publishState: PublishState) {
    switch (publishState) {
      case PublishState.InReview: return 'In review';
      case PublishState.Rejected: return 'Rejected';
      case PublishState.Published: return 'Published';
      case PublishState.Unpublished: return 'Unpublished';
    }
  }
}
