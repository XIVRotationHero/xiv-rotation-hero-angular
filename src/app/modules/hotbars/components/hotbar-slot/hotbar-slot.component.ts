import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {KeyBindingService} from "../../../key-binding/services/key-binding.service";
import {Observable, of} from "rxjs";
import {CdkDragDrop } from "@angular/cdk/drag-drop";
import {HotbarService} from "../../services/hotbar.service";
import {GameDataService} from "../../../../core/services/game-data.service";
import {ActionService} from "../../../actions/services/action.service";

@Component({
  selector: 'rh-hotbar-slot',
  templateUrl: './hotbar-slot.component.html',
  styleUrls: ['./hotbar-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotbarSlotComponent implements OnChanges {

  @Input() hotbarId: number = -1;
  @Input() slotId: number = -1;
  @Input() actionId?: number = -1;

  @HostBinding('class.empty')
  private isEmpty: boolean = false;

  public keyBinding$: Observable<string | undefined> = of();

  public cdkDropListData: [ number? ] = [];

  constructor(
    private readonly keyBindingService: KeyBindingService,
    private readonly hotbarService: HotbarService,
    private readonly gameDataService: GameDataService,
    private readonly actionService: ActionService
  ) {}

  ngOnInit() {
    this.isEmpty = !this.actionId || this.actionId < 1;

    this.keyBindingService.getBindingLabelStream(`Hotbar ${this.hotbarId + 1} - Slot ${this.slotId + 1}`)
      .subscribe(this.triggerAction.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('hotbarId') || changes.hasOwnProperty('slotId')) {
      this.keyBinding$ = this.keyBindingService.getBindingKeyStream(`Hotbar ${this.hotbarId + 1} - Slot ${this.slotId + 1}`);
    }

    if (changes.hasOwnProperty('actionId')) {
      this.isEmpty = !this.actionId || this.actionId < 1;
      this.cdkDropListData = this.actionId ? [ this.actionId ] : [];
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    this.hotbarService.allocateAction(this.hotbarId, this.slotId, event.item.data.ID);
  }

  triggerAction() {
    if (this.actionId) {
      this.actionService.triggerActionId(this.actionId);
    }
  }
}
