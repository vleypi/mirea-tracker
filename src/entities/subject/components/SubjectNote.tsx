import { formatDaysFromNow } from "@/shared/lib";
import { SUBJECT_TEXT } from "@/entities/subject/constants/subject.constant";
import type { ISubjectSummary } from "@/entities/subject/interfaces/subject.interface";

interface ISubjectNoteProps {
  summary: ISubjectSummary;
  today: Date;
}

export const SubjectNote = ({ summary: { total, done, overdue, next }, today }: ISubjectNoteProps) => {
  if (total === 0) return <span className="text-zinc-400">{SUBJECT_TEXT.noBlocks}</span>;
  if (overdue > 0) return <span className="font-medium text-rose-600">{`${SUBJECT_TEXT.overdue} ${overdue}`}</span>;
  if (done === total) return <span className="font-medium text-emerald-600">{SUBJECT_TEXT.allClosed}</span>;
  if (next?.due) return <span className="text-zinc-500">{`${next.title} ${formatDaysFromNow(next.due.end, today)}`}</span>;
  return <span className="text-zinc-400">{SUBJECT_TEXT.noDue}</span>;
};
