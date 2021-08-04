import { Phase } from "../enums/phase";

export interface RotationCreate {
  title: string,
  description: string,
  classJobId: number,
  phases: {
    phase: Phase,
    actions: number[]
  }[]
}
