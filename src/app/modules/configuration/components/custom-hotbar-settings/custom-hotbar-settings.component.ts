import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {take} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigurationService} from "../../services/configuration.service";
import {HotbarSideSet} from "../../../hotbars/types/hotbar-side-set";
import {Side} from "../../../hotbars/enums/side";
import {WxhbInputType} from "../../../cross-hotbar/enums/wxhb-input-type";

@Component({
  selector: 'rh-custom-hotbar-settings',
  templateUrl: './custom-hotbar-settings.component.html',
  styleUrls: ['./custom-hotbar-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomHotbarSettingsComponent implements OnInit {

  public hotbarOptions: HotbarSideSet[] = []
  public form!: FormGroup;

  public readonly WxhbInputType = WxhbInputType;

  constructor(
    private readonly fb: FormBuilder,
    private readonly configurationService: ConfigurationService
  ) {
    this.generateHotbarOptions();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      hotbarOptions: this.fb.array([])
    });

    const optionByArray = (option: [ number, Side ]) =>
        this.hotbarOptions.find((hotbarSideSet) => hotbarSideSet[0] === option[0] && hotbarSideSet[1] === option[1])

    this.configurationService.hotbarCustomSettings$.pipe(take(1))
      .subscribe((customSettings) => {
        this.form.addControl('enableExpandedControls', this.fb.control(customSettings.enableExpandedControls));
        this.form.addControl('enableWxhbWithDoubleTap', this.fb.control(customSettings.enableWxhbWithDoubleTap));
        this.form.addControl('wxhbInputType', this.fb.control(customSettings.wxhbInputType));
        this.form.addControl('displayWithLtRt', this.fb.control(optionByArray(customSettings.displayWithLtRt)));
        this.form.addControl('displayWithRtLt', this.fb.control(optionByArray(customSettings.displayWithRtLt)));
        this.form.addControl('displayWithDoubleLt', this.fb.control(optionByArray(customSettings.displayWithDoubleLt)));
        this.form.addControl('displayWithDoubleRt', this.fb.control(optionByArray(customSettings.displayWithDoubleRt)));
      });

    this.form.valueChanges.subscribe((value) => this.configurationService.hotbarCustomSettingsSubject$.next(value));
  }

  public getHotbarLabel(set: HotbarSideSet): string {
    return `Hotbar ${set[0] + 1} - ${ set[1] === Side.Left ? 'Left' : 'Right' }`;
  }

  private generateHotbarOptions() {
    for(let i=0; i<8; i++) {
      this.hotbarOptions.push([ i, Side.Left ], [ i, Side.Right ])
    }
  }

}
