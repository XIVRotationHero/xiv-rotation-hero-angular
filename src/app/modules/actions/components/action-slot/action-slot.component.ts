import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges
} from "@angular/core";
import {HotbarService} from "../../../hotbars/services/hotbar.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {delay, startWith, switchMap} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {KeyBindingService} from "../../../key-binding/services/key-binding.service";
import {GameDataService} from "../../../../core/services/game-data.service";
import {ActionService} from "../../services/action.service";

@Component({
  selector: 'rh-action-slot',
  templateUrl: './action-slot.component.html',
  styleUrls: ['./action-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSlotComponent implements OnChanges {

  @Input() hotbarId: number = -1;
  @Input() slotId: number = -1;
  @Input() actionId?: number;
  @Input() displayRecastTime = false;
  @Input() keyBindingLabel?: string;
  @Input() canShowCooldown = false;
  @Input() canShowComboIndicator = false;
  @Input() canShowTooltip = true;
  @Input() canShowCost = false;

  @HostBinding('class.empty')
  private isEmpty: boolean = false;

  @Output() public onDrop: EventEmitter<{ hotbarId: number, slotId: number, actionId: number }> = new EventEmitter();

  public keyBinding$: Observable<string | undefined> = of();
  public cdkDropListData: [number?] = [];

  private readonly triggered$ = new Subject();
  public readonly showTriggerBorder$ = this.triggered$.pipe(
      switchMap(() => of(false).pipe(delay(200), startWith(true)))
  );

  constructor(
      private readonly keyBindingService: KeyBindingService,
      private readonly hotbarService: HotbarService,
      private readonly gameDataService: GameDataService,
      private readonly actionService: ActionService,
      private readonly renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.isEmpty = !this.actionId || this.actionId < 1;

    if (this.keyBindingLabel) {
      this.keyBindingService.getBindingLabelStream(this.keyBindingLabel)
          .subscribe(this.triggerAction.bind(this));

      this.keyBinding$ = this.keyBindingService.getBindingKeyStream(this.keyBindingLabel);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('actionId')) {
      this.isEmpty = !this.actionId || this.actionId < 1;
      this.cdkDropListData = this.actionId ? [this.actionId] : [];
    }
  }

  public onDropHandler(event: CdkDragDrop<any>) {
    console.log(event);
    if (this.hotbarId !== undefined && this.hotbarId !== -1 &&
        this.slotId !== undefined && this.slotId !== -1) {
      this.onDrop.next({
        hotbarId: this.hotbarId,
        slotId: this.slotId,
        actionId: event.item.data
      })
    }
  }

  public triggerAction() {
    this.triggered$.next();

    if (this.actionId) {
      this.actionService.triggerActionId(this.actionId);
    }
  }

  public disableTooltips() {
    this.renderer.addClass(document.body, 'disable-tooltips');
  }

  public enableTooltips() {
    this.renderer.removeClass(document.body, 'disable-tooltips');
  }
}
