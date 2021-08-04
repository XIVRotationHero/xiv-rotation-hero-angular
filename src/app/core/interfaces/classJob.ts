import {ClassJobShort} from "./class-job-short";

export interface ClassJob extends ClassJobShort {
  Abbreviation: string,
  ClassJobParentTargetID: number,
  ClassJobParent: {
    ClassJobCategory: number
  },
  GameContentLinks: {
    Actions: number[],
    ActionIndirection: {
      ClassJob: number[]
    } | null
  }
}
