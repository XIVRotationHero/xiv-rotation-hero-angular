import {CostType} from "../enums/cost-type";

export interface Action {
  ID: number,
  Name: string,
  Description: string,
  BehaviourType: number,
  ClassJobLevel: number,
  CooldownGroup: number,
  ActionComboTargetID: any,
  IconHD: string,
  Cast100ms: number,
  Recast100ms: number,
  PreservesCombo: number,
  PrimaryCostType: CostType,
  PrimaryCostValue: number,
  SecondaryCostType: CostType,
  SecondaryCostValue: number,
  ActionCategory: {
    ID: number,
    Name: string
  },
  CastType: number,
  EffectRange: number,
  Range: number,
  TargetArea: number
}
