import {RotationPhase} from "./rotation-phase";
import {PublishState} from "../enums/publish-state";
import {UserShort} from "./user-short";

export interface Rotation {
  classJobId: number,
  createdAt: string,
  description: string,
  favouriteCount: number,
  id: string,
  patch: string,
  phases: RotationPhase[],
  publishState: PublishState,
  title: string,
  user: UserShort
}
