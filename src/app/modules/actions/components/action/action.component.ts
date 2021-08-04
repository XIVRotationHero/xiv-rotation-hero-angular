import {Component, HostBinding, Input} from '@angular/core';
import {Action} from "../../interfaces/action";
import {ActionService} from "../../services/action.service";
import {ActionCostService} from "../../services/action-cost.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'rh-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  @Input() public action: Action | null = null;

  @Input() public showCooldowns = false;
  @Input() public showComboIndicator = false;

  public isComboAction = false;

  @HostBinding('class.is-executable')
  public isExecutable = false;

  constructor(
    private readonly actionService: ActionService,
    private readonly actionCostService: ActionCostService
  ) {
    this.actionService.comboActionIds$
      .subscribe((comboIds) => {
        this.isComboAction = comboIds.includes(this.action?.ActionComboTargetID)
      });
  }

  public ngOnInit() {

    this.actionCostService.resources$
      .pipe(
        map((resources) => {
          if (!this.action) {
            return false;
          }

          const { PrimaryCostType, PrimaryCostValue, SecondaryCostType, SecondaryCostValue} = this.action;

          return (
            (!PrimaryCostType || resources[PrimaryCostType] >= PrimaryCostValue) &&
            (!SecondaryCostType || resources[SecondaryCostType] >= SecondaryCostValue)
          )
        })
      )
      .subscribe((isExecutable) => this.isExecutable = isExecutable);
  }

}
