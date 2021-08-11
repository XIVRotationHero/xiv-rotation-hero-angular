import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'rh-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {
  //
  // public readonly hotbarSettings$ = this.hotbarService.hotbarSettings$;
  //
  // public form: FormGroup;
  //
  // constructor(
  //   private readonly hotbarService: HotbarService,
  //   private readonly fb: FormBuilder
  // ) {
  //   this.hotbarSettings$.pipe();
  //
  //   this.form = this.fb.group({
  //     displayRecastTimes: this.fb.control(true),
  //     hideUnassignedSlots: this.fb.control(true),
  //     displayHotbarNumbers: this.fb.control(true),
  //     enableHotbarCyclingButton: this.fb.control(true),
  //     enableDragDropPositioning: this.fb.control(true),
  //     hotbarOptions: this.fb.array([])
  //   });
  //
  //   this.hotbarSettings$.pipe(take(1))
  //     .subscribe((hotbarOptions) => {
  //       hotbarOptions.forEach((hotbarOption) => {
  //         this.hotbarOptionsArray.push(this.createHotbarFormGroup(hotbarOption));
  //       });
  //     });
  //
  //   this.form.valueChanges.subscribe((value) => {
  //     this.hotbarService.updateHotbarOptions(value.hotbarOptions);
  //   });
  // }
  //
  // public get hotbarOptionsArray(): FormArray {
  //   return <FormArray>this.form.controls.hotbarOptions;
  // }
  //
  // private createHotbarFormGroup(hotbarOption: HotbarOptions) {
  //   return this.fb.group({
  //     visible: this.fb.control(hotbarOption.visible),
  //     hotbarStyle: this.fb.control(hotbarOption.hotbarStyle),
  //     scale: this.fb.control(hotbarOption.scale)
  //   });
  // }

}
