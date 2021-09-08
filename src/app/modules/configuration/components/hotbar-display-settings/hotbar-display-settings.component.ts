import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {HotbarService} from "../../../hotbars/services/hotbar.service";
import {take} from "rxjs/operators";
import {HotbarOptions} from "../../../hotbars/interfaces/hotbar-options";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: 'rh-hotbar-display-settings',
  templateUrl: './hotbar-display-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotbarDisplaySettingsComponent {
  public readonly hotbarSettings$ = this.hotbarService.hotbarSettings$;

  public form: FormGroup;

  constructor(
    private readonly hotbarService: HotbarService,
    private readonly configurationService: ConfigurationService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      hotbarOptions: this.fb.array([])
    });

    this.configurationService.hotbarDisplaySettings$.pipe(take(1))
      .subscribe((displaySettings) => {
        this.form.addControl('displayRecastTimes', this.fb.control(displaySettings.displayRecastTimes));
        this.form.addControl('hideUnassignedSlots', this.fb.control(displaySettings.hideUnassignedSlots));
        this.form.addControl('displayHotbarNumbers', this.fb.control(displaySettings.displayHotbarNumbers));
        this.form.addControl('enableHotbarCyclingButton', this.fb.control(displaySettings.enableHotbarCyclingButton));
        this.form.addControl('enableDragDropRepositioning', this.fb.control(displaySettings.enableDragDropRepositioning));
      });

    this.hotbarSettings$.pipe(take(1))
      .subscribe((hotbarOptions) => {
        hotbarOptions.forEach((hotbarOption) => {
          this.hotbarOptionsArray.push(this.createHotbarFormGroup(hotbarOption));
        });
      });

    this.form.valueChanges.subscribe((value) => {
      const { hotbarOptions, ...options } = value;

      this.hotbarService.updateHotbarOptions(value.hotbarOptions);

      this.configurationService.hotbarDisplaySettingsSubject$.next(options);
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
