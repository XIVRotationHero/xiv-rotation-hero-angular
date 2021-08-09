import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HotbarService} from "../hotbars/services/hotbar.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {take} from "rxjs/operators";
import {HotbarOptions} from "../hotbars/interfaces/hotbar-options";

@Component({
  selector: 'rh-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  public readonly hotbarSettings$ = this.hotbarService.hotbarSettings$;

  public form: FormGroup;

  constructor(
    private readonly hotbarService: HotbarService,
    private readonly fb: FormBuilder
  ) {
    this.hotbarSettings$.pipe();

    this.form = this.fb.group({
      hotbarOptions: this.fb.array([])
    });

    this.hotbarSettings$.pipe(take(1))
      .subscribe((hotbarOptions) => {
        hotbarOptions.forEach((hotbarOption) => {
          this.hotbarOptionsArray.push(this.createHotbarFormGroup(hotbarOption));
        });
      });

    this.form.valueChanges.subscribe((value) => {
      this.hotbarService.updateHotbarOptions(value.hotbarOptions);
    });
  }

  public get hotbarOptionsArray(): FormArray {
    return <FormArray>this.form.controls.hotbarOptions;
  }

  private createHotbarFormGroup(hotbarOption: HotbarOptions) {
    return this.fb.group({
      visible: this.fb.control(hotbarOption.visible),
      hotbarStyle: this.fb.control(hotbarOption.hotbarStyle),
      scale: this.fb.control(hotbarOption.scale)
    });
  }

}
