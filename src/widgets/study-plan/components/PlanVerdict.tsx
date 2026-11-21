import { formatDay, formatNumber, pluralize, roundUpToHalf } from "@/shared/lib";
import type { IPlan } from "@/entities/subject";
import { LECTURE_FORMS, STUDY_PLAN_TEXT } from "@/widgets/study-plan/constants/study-plan.constant";

interface IPlanVerdictProps {
  plan: IPlan;
}

export const PlanVerdict = ({ plan }: IPlanVerdictProps) => {
  if (plan.complete) return <p className="text-sm font-medium text-emerald-600">{STUDY_PLAN_TEXT.complete}</p>;
  if (plan.stuck) {
    return (
      <p className="text-sm font-medium text-rose-600">
        {`${STUDY_PLAN_TEXT.stuckStart} ${formatNumber(roundUpToHalf(plan.extra))} ${STUDY_PLAN_TEXT.stuckEnd}`}
      </p>
    );
  }
  if (!plan.steps.length) {
    return (
      <p className="text-sm text-zinc-700">
        {`${STUDY_PLAN_TEXT.lecturesOnly} `}
        <b>{plan.lectures}</b>
        {` ${pluralize(plan.lectures, LECTURE_FORMS)}.`}
      </p>
    );
  }
  if (plan.finish) {
    return (
      <p className="text-sm text-zinc-700">
        {`${STUDY_PLAN_TEXT.finishBy} `}
        <b>{formatDay(plan.finish)}</b>.
      </p>
    );
  }
  return <p className="text-sm text-zinc-700">{STUDY_PLAN_TEXT.noFinish}</p>;
};
