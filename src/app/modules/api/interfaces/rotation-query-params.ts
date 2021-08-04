import {QueryParams} from "./query-params";
import {Rotation} from "./rotation";

export interface RotationQueryParams extends QueryParams<Rotation> {
  classJobId?: number;
}
