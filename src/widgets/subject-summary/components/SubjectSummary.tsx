import { formatNumber, formatPreciseNumber } from "@/shared/lib";
import { ProgressBar } from "@/shared/ui";
import { type IResolvedSubject, KindBadge } from "@/entities/subject";
import { SummaryMetric } from "@/widgets/subject-summary/components/SummaryMetric";
import { SUBJECT_SUMMARY_TEXT } from "@/widgets/subject-summary/constants/subject-summary.constant";

interface ISubjectSummaryProps {
  subject: IResolvedSubject;
}

export const SubjectSummary = ({ subject: { title, kind, summary } }: ISubjectSummaryProps) => (
  <header className="mt-6 flex flex-col gap-4 rounded-3xl bg-zinc-900 p-6 text-white sm:p-8">
    {kind && <KindBadge kind={kind} tone="dark" />}
    <h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">{title}</h1>
    <dl className="mt-4 grid grid-cols-3 gap-4">
      <SummaryMetric label={SUBJECT_SUMMARY_TEXT.done} value={summary.done} total={summary.total} />
      <SummaryMetric label={SUBJECT_SUMMARY_TEXT.points} value={formatPreciseNumber(summary.points)} total={formatNumber(summary.required)} />
      <SummaryMetric label={SUBJECT_SUMMARY_TEXT.overdue} value={summary.overdue} alert={summary.overdue > 0} />
    </dl>
    <div className="mt-2">
      <ProgressBar total={summary.total} done={summary.done} submitted={summary.submitted} trackClassName="bg-white/10" />
    </div>
  </header>
);
