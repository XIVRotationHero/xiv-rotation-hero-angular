import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'rh-set-select',
  templateUrl: './set-select.component.html',
  styleUrls: ['./set-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetSelectComponent {

  @Input() activeHotbarIndex!: number | null;
  @Input() availableHotbarSets: any[] = [];

}
