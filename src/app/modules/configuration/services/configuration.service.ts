import {Injectable} from '@angular/core';
import {HotbarDisplaySettings} from "../../hotbars/interfaces/hotbar-display-settings";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {scan, shareReplay} from "rxjs/operators";

enum LocalStoragePersistanceKey {
  HotbarDisplaySettings = "rh-hotbar-display-settings"
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

  public constructor() {
    this.hotbarDisplaySettings$
      .subscribe((value) => {
        this.persistSettings(LocalStoragePersistanceKey.HotbarDisplaySettings, value)
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
