import {Component, ElementRef, HostBinding, HostListener, Input, ViewChild} from '@angular/core';
import {Action} from "../../interfaces/action";
import {ActionService} from "../../services/action.service";
import {ActionCostService} from "../../services/action-cost.service";
import {map} from "rxjs/operators";
import {createPopper, Instance} from "@popperjs/core";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'rh-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  @Input() public action!: Action;

  @Input() public showCooldowns = false;
  @Input() public showComboIndicator = false;

  public isComboAction = false;

  @HostBinding('class.is-executable')
  public isExecutable = false;

  @ViewChild('tooltip', { static: true })
  public actionTooltip: ElementRef | undefined;

  public tooltipInstance?: Instance;

  constructor(
    private readonly actionService: ActionService,
    private readonly actionCostService: ActionCostService,
    private readonly elementRef: ElementRef,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.actionService.comboActionIds$
      .subscribe((comboIds) => {
        this.isComboAction = comboIds.includes(this.action?.ActionComboTargetID)
      });
  }

  public ngOnInit() {
    this.domSanitizer.bypassSecurityTrustHtml(this.action.Description);

    this.actionCostService.resources$
      .pipe(
        map((resources) => {
          if (!this.action) {
            return false;
          }

          const {PrimaryCostType, PrimaryCostValue, SecondaryCostType, SecondaryCostValue} = this.action;

          return (
            (!PrimaryCostType || resources[PrimaryCostType] >= PrimaryCostValue) &&
            (!SecondaryCostType || resources[SecondaryCostType] >= SecondaryCostValue)
          )
        })
      )
      .subscribe((isExecutable) => this.isExecutable = isExecutable);
  }

  public getSafeDescription(text: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(text);
  }

  @HostListener('mouseover')
  public onMouseOver() {
    if (this.tooltipInstance) return;

    this.tooltipInstance = createPopper(
      this.elementRef.nativeElement,
      this.actionTooltip?.nativeElement,
      {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [10, 10]
            }
          }
        ]
      }
    );
    this.actionTooltip?.nativeElement.setAttribute('data-show', '');
  }

  @HostListener('mouseout')
  public onMouseOut() {
    this.actionTooltip?.nativeElement.removeAttribute('data-show');
    this.tooltipInstance?.destroy();
    this.tooltipInstance = undefined;
  }
}
