import {Injectable} from '@angular/core';
import {HotbarDisplaySettings} from "../interfaces/hotbar-display-settings";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {scan, shareReplay} from "rxjs/operators";
import {HotbarCustomSettings} from "../interfaces/hotbar-custom-settings";
import {Side} from "../../hotbars/enums/side";
import {WxhbInputType} from "../../cross-hotbar/enums/wxhb-input-type";
import {HotbarCrossSettings} from "../interfaces/hotbar-cross-settings";
import {CrossHotbarControls} from "../../cross-hotbar/enums/cross-hotbar-controls";
import {CrossHotbarDisplayType} from "../../cross-hotbar/enums/cross-hotbar-display-type";
import {InputType} from "../enums/input-type";

enum LocalStoragePersistanceKey {
  InputType = 'rh-input-type',
  HotbarDisplaySettings = 'rh-hotbar-display-settings',
  HotbarCrossSettings = 'rh-hotbar-cross-settings',
  HotbarCustomSettings = 'rh-hotbar-custom-settings'
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly HOTBAR_DISPLAY_SETTINGS_DEFAULTS: HotbarDisplaySettings = {
    displayHotbarNumbers: true,
    displayRecastTimes: true,
    enableDragDropRepositioning: true,
    enableHotbarCyclingButton: false,
    hideUnassignedSlots: false
  }

  private readonly HOTBAR_CUSTOM_SETTINGS_DEFAULTS: HotbarCustomSettings = {
    enableExpandedControls: true,
    enableWxhbWithDoubleTap: false,
    displayWithLtRt: [7, Side.Left],
    displayWithRtLt: [7, Side.Right],
    wxhbInputType: WxhbInputType.ActionButtons,
    displayWithDoubleLt: [1, Side.Left],
    displayWithDoubleRt: [1, Side.Right]
  }

  private readonly HOTBAR_CROSS_SETTINGS_DEFAULTS: HotbarCrossSettings = {
    enableCrossHotbar: true,
    alwaysDisplayCrossHotbar: false,
    crossHotbarControls: CrossHotbarControls.Hold,
    crossHotbarDisplayType: CrossHotbarDisplayType.DpadActionButtons,
    alwaysDisplayWxhb: false,
    displayHotbarHelp: false,
    displayControlGuide: false,
    positionWxhbSeparatelyFromXhb: false,
    returnToXhbAfterWxhbInput: false,
    wxhbInputTimer: 25
  }

  public readonly hotbarDisplaySettingsSubject$: Subject<Partial<HotbarDisplaySettings>> = new BehaviorSubject(this.loadSettings(LocalStoragePersistanceKey.HotbarDisplaySettings, this.HOTBAR_DISPLAY_SETTINGS_DEFAULTS));
  public readonly hotbarDisplaySettings$: Observable<HotbarDisplaySettings> = this.hotbarDisplaySettingsSubject$.pipe(
      scan((acc, next) => {
        return {
          ...acc,
          ...next
        }
      }, this.HOTBAR_DISPLAY_SETTINGS_DEFAULTS),
      shareReplay(1)
  );


  public readonly hotbarCrossSettingsSubject$: Subject<Partial<HotbarCrossSettings>> = new BehaviorSubject(this.loadSettings(LocalStoragePersistanceKey.HotbarCrossSettings, this.HOTBAR_CROSS_SETTINGS_DEFAULTS));
  public readonly hotbarCrossSettings$: Observable<HotbarCrossSettings> = this.hotbarCrossSettingsSubject$.pipe(
      scan((acc, next) => {
        return {
          ...acc,
          ...next
        }
      }, this.HOTBAR_CROSS_SETTINGS_DEFAULTS),
      shareReplay(1)
  );

  public readonly hotbarCustomSettingsSubject$: Subject<Partial<HotbarCustomSettings>> = new BehaviorSubject(this.loadSettings(LocalStoragePersistanceKey.HotbarCustomSettings, this.HOTBAR_CUSTOM_SETTINGS_DEFAULTS));
  public readonly hotbarCustomSettings$: Observable<HotbarCustomSettings> = this.hotbarCustomSettingsSubject$.pipe(
      scan((acc, next) => {
        return {
          ...acc,
          ...next
        }
      }, this.HOTBAR_CUSTOM_SETTINGS_DEFAULTS),
      shareReplay(1)
  );

  public readonly inputType$: Subject<InputType> = new BehaviorSubject(this.loadSettings(LocalStoragePersistanceKey.InputType, InputType.Mouse));

  public constructor() {
    this.hotbarDisplaySettings$
        .subscribe((value) => {
          this.persistSettings(LocalStoragePersistanceKey.HotbarDisplaySettings, value)
        });

    this.hotbarCrossSettings$
        .subscribe((value) => {
          this.persistSettings(LocalStoragePersistanceKey.HotbarCrossSettings, value)
        });

    this.hotbarCustomSettings$
        .subscribe((value) => {
          this.persistSettings(LocalStoragePersistanceKey.HotbarCustomSettings, value)
        });

    this.inputType$
        .subscribe((value) => {
          this.persistSettings(LocalStoragePersistanceKey.InputType, value);
        });
  }

  private loadSettings<T>(settingsKey: string, defaults: T): Partial<T> {
    const storedSettings = localStorage.getItem(settingsKey);

    if (storedSettings) {
      try {
        return JSON.parse(storedSettings) as T;
      } catch (e) {
      }
    }

    return defaults;
  }

  private persistSettings(settingsKey: string, value: any) {
    localStorage.setItem(settingsKey, JSON.stringify(value))
  }
}
