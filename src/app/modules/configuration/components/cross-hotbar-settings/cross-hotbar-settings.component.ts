import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HotbarService} from "../../../hotbars/services/hotbar.service";
import {ConfigurationService} from "../../services/configuration.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {take} from "rxjs/operators";
import {CrossHotbarControls} from "../../../cross-hotbar/enums/cross-hotbar-controls";
import {CrossHotbarDisplayType} from "../../../cross-hotbar/enums/cross-hotbar-display-type";

@Component({
  selector: 'rh-cross-hotbar-settings',
  templateUrl: './cross-hotbar-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossHotbarSettingsComponent {

  public readonly form: FormGroup;

  public readonly CrossHotbarControls = CrossHotbarControls;
  public readonly CrossHotbarDisplayType = CrossHotbarDisplayType

  constructor(
      private readonly hotbarService: HotbarService,
      private readonly configurationService: ConfigurationService,
      private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      hotbarOptions: this.fb.array([])
    });

    this.configurationService.hotbarCrossSettings$.pipe(take(1))
        .subscribe((crossSettings) => {
          this.form.addControl('enableCrossHotbar', this.fb.control(crossSettings.enableCrossHotbar));
          this.form.addControl('alwaysDisplayCrossHotbar', this.fb.control(crossSettings.alwaysDisplayCrossHotbar));
          this.form.addControl('displayHotbarHelp', this.fb.control(crossSettings.displayHotbarHelp));
          this.form.addControl('displayControlGuide', this.fb.control(crossSettings.displayControlGuide));
          this.form.addControl('crossHotbarControls', this.fb.control(crossSettings.crossHotbarControls));
          this.form.addControl('crossHotbarDisplayType', this.fb.control(crossSettings.crossHotbarDisplayType));
          this.form.addControl('alwaysDisplayWxhb', this.fb.control(crossSettings.alwaysDisplayWxhb));
          this.form.addControl('returnToXhbAfterWxhbInput', this.fb.control(crossSettings.returnToXhbAfterWxhbInput));
          this.form.addControl('positionWxhbSeparatelyFromXhb', this.fb.control(crossSettings.positionWxhbSeparatelyFromXhb));
          this.form.addControl('wxhbInputTimer', this.fb.control(crossSettings.wxhbInputTimer));
        });

    this.form.valueChanges.subscribe((value) => this.configurationService.hotbarCrossSettingsSubject$.next(value));
  }
}
