import type { MARKS, STATUSES, SUBJECT_KINDS } from "@/entities/subject/constants/subject.constant";
import type { GRADES, PLAN_MODE_KEYS } from "@/entities/subject/constants/plan.constant";

export type Status = (typeof STATUSES)[number];
export type Mark = (typeof MARKS)[number];
export type SubjectKind = (typeof SUBJECT_KINDS)[number];
export type Grade = (typeof GRADES)[number];
export type PlanMode = (typeof PLAN_MODE_KEYS)[number];

export interface IItem {
  id: string;
  title: string;
  status: Status;
}

export interface IBlock {
  id: string;
  title: string;
  required: number;
  points: number;
  status: Status;
  due: string | null;
  items: IItem[];
}

export interface IAttendance {
  max: number;
  marks: (Mark | null)[];
}

export interface ISubject {
  id: string;
  title: string;
  kind: SubjectKind | null;
  attendance: IAttendance | null;
  blocks: IBlock[];
  goal?: Grade;
  planMode?: PlanMode;
}

export interface IDue {
  end: Date;
  label: string;
}

export interface IResolvedItem extends IItem {
  overdue: boolean;
}

export interface IResolvedBlock extends Omit<IBlock, "due" | "items"> {
  due: IDue | null;
  overdue: boolean;
  items: IResolvedItem[];
}

export interface ISubjectSummary {
  total: number;
  done: number;
  submitted: number;
  overdue: number;
  points: number;
  required: number;
  next: IResolvedBlock | null;
}

export interface IResolvedSubject extends Omit<ISubject, "blocks"> {
  blocks: IResolvedBlock[];
  summary: ISubjectSummary;
}

export interface IAttendanceStats {
  max: number;
  total: number;
  excused: number;
  counted: number;
  perLecture: number;
  points: number;
  left: number;
}
