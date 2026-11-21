import { sum } from "@/shared/lib";
import type { IResolvedSubject, ISubjectSummary } from "@/entities/subject";
import { OverviewStat } from "@/widgets/subjects-overview/components/OverviewStat";
import { SUBJECTS_OVERVIEW_TEXT } from "@/widgets/subjects-overview/constants/subjects-overview.constant";

interface ISubjectsOverviewProps {
  subjects: IResolvedSubject[];
}

type CountKey = keyof Pick<ISubjectSummary, "total" | "done" | "submitted" | "overdue">;

export const SubjectsOverview = ({ subjects }: ISubjectsOverviewProps) => {
  const total = (key: CountKey) => sum(subjects.map(({ summary }) => summary[key]));
  return (
    <dl className="flex flex-wrap gap-2">
      <OverviewStat label={SUBJECTS_OVERVIEW_TEXT.done} value={`${total("done")} ${SUBJECTS_OVERVIEW_TEXT.of} ${total("total")}`} dotClassName="bg-emerald-500" />
      <OverviewStat label={SUBJECTS_OVERVIEW_TEXT.submitted} value={total("submitted")} dotClassName="bg-amber-400" />
      <OverviewStat label={SUBJECTS_OVERVIEW_TEXT.overdue} value={total("overdue")} dotClassName="bg-rose-500" />
    </dl>
  );
};
