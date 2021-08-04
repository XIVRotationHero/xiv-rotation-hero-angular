import {PhaseDisplayMode} from "../enums/phase-display-mode";
import {ActionFailMode} from "../enums/action-fail-mode";

export interface PlayerOptions {
  isBlindModeEnabled: boolean,
  switchClassJobOnRotationChange: boolean,
  phaseDisplayMode: PhaseDisplayMode,
  actionFailMode: ActionFailMode
}
