import {Component, ElementRef, HostBinding, HostListener, Input, ViewChild} from '@angular/core';
import {Action} from "../../interfaces/action";
import {ActionService} from "../../services/action.service";
import {ActionCostService} from "../../services/action-cost.service";
import {map} from "rxjs/operators";
import {createPopper, Instance} from "@popperjs/core";
import {DomSanitizer} from "@angular/platform-browser";
import {ActionTooltipComponent} from "../action-tooltip/action-tooltip.component";

@Component({
  selector: 'rh-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  @Input() public action!: Action;
  @Input() public showCooldowns = false;
  @Input() public showComboIndicator = false;
  @Input() public displayRecastTime = false;
  @Input() public canShowTooltip = true;

  public isComboAction = false;

  @HostBinding('class.is-executable')
  public isExecutable = false;

  @ViewChild('tooltip', {static: true})
  public actionTooltip!: ActionTooltipComponent;

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

  @HostListener('mouseover')
  public onMouseOver() {
    if (this.tooltipInstance) return;

    this.tooltipInstance = createPopper(
        this.elementRef.nativeElement,
        this.actionTooltip.elementRef.nativeElement,
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
    this.actionTooltip.elementRef.nativeElement.setAttribute('data-show', '');
  }

  @HostListener('mouseout')
  public onMouseOut() {
    this.actionTooltip.elementRef.nativeElement.removeAttribute('data-show');
    this.tooltipInstance?.destroy();
    this.tooltipInstance = undefined;
  }
}
