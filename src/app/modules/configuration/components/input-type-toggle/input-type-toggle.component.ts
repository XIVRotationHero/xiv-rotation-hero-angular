import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {InputType} from "../../enums/input-type";

@Component({
  selector: 'rh-input-type-toggle',
  templateUrl: './input-type-toggle.component.html',
  styleUrls: ['./input-type-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTypeToggleComponent {
  @Input() public inputType!: InputType;

  @Output() public onInputTypeChange: EventEmitter<InputType> = new EventEmitter();

  public readonly InputType = InputType;
}
