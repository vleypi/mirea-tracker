import { joinClassNames } from "@/shared/lib";
import { SUBJECT_TEXT } from "@/entities/subject/constants/subject.constant";
import type { IResolvedBlock } from "@/entities/subject/interfaces/subject.interface";

interface IDueLabelProps {
  block: Pick<IResolvedBlock, "due" | "overdue">;
  detailed?: boolean;
}

export const DueLabel = ({ block: { due, overdue }, detailed = false }: IDueLabelProps) => {
  if (!due) return <span className="text-sm text-zinc-400">{SUBJECT_TEXT.noDue}</span>;
  const prefix = overdue ? SUBJECT_TEXT.duePassed : SUBJECT_TEXT.due;
  return (
    <span className={joinClassNames("text-sm tabular-nums", overdue ? "font-medium text-rose-600" : "text-zinc-500")}>
      {detailed ? `${prefix} ${due.label}` : due.label}
    </span>
  );
};
