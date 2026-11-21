import Link from "next/link";
import { ROUTES } from "@/shared/config";
import { formatNumber, joinClassNames } from "@/shared/lib";
import { INTERACTIVE_CARD_CLASS_NAME, ProgressBar } from "@/shared/ui";
import { SUBJECT_TEXT } from "@/entities/subject/constants/subject.constant";
import type { IResolvedSubject } from "@/entities/subject/interfaces/subject.interface";
import { KindBadge } from "@/entities/subject/components/KindBadge";
import { SubjectNote } from "@/entities/subject/components/SubjectNote";

interface ISubjectCardProps {
  subject: IResolvedSubject;
  today: Date;
}

export const SubjectCard = ({ subject: { id, title, kind, summary }, today }: ISubjectCardProps) => (
  <li>
    <Link href={ROUTES.subject(id)} className={joinClassNames(INTERACTIVE_CARD_CLASS_NAME, "bg-white")}>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg leading-snug font-semibold">{title}</h2>
        {kind && <KindBadge kind={kind} />}
      </div>
      <div className="mt-auto pt-10">
        {summary.total > 0 && (
          <>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium tabular-nums">{`${summary.done} ${SUBJECT_TEXT.of} ${summary.total}`}</span>
              <span className="text-zinc-500 tabular-nums">
                {`${formatNumber(summary.points)} / ${formatNumber(summary.required)} ${SUBJECT_TEXT.points}`}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar total={summary.total} done={summary.done} submitted={summary.submitted} />
            </div>
          </>
        )}
        <p className="mt-4 text-sm">
          <SubjectNote summary={summary} today={today} />
        </p>
      </div>
    </Link>
  </li>
);
