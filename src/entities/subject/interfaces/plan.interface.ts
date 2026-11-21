import type { Grade, IResolvedBlock, PlanMode } from "@/entities/subject/interfaces/subject.interface";

export interface IPlanStep {
  block: IResolvedBlock;
  target: number;
  penalty: number;
  left: number;
}

export interface IPlan {
  mode: PlanMode;
  exam: boolean;
  goal: Grade | null;
  buffer: number;
  targetPoints: number;
  needClosed: number;
  total: number;
  doneCount: number;
  earnedNow: number;
  projected: number;
  steps: IPlanStep[];
  skipped: IResolvedBlock[];
  lectures: number;
  lecturesLeft: number;
  perLecture: number;
  extra: number;
  finish: Date | null;
  complete: boolean;
  stuck: boolean;
}
