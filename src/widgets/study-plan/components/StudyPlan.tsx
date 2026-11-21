"use client";

import { formatNumber, joinClassNames, roundUpToHalf, useToday } from "@/shared/lib";
import { Card, CardHeader } from "@/shared/ui";
import { buildPlan, type IPlan, type IResolvedSubject, PLAN_MODES } from "@/entities/subject";
import { GoalControl, PlanModeControl } from "@/features/choose-plan";
import { LecturesRow } from "@/widgets/study-plan/components/LecturesRow";
import { PlanStepRow } from "@/widgets/study-plan/components/PlanStepRow";
import { PlanVerdict } from "@/widgets/study-plan/components/PlanVerdict";
import { SHORTFALL_TOLERANCE, STUDY_PLAN_TEXT } from "@/widgets/study-plan/constants/study-plan.constant";

interface IStudyPlanProps {
  subject: IResolvedSubject;
}

const describeRule = (plan: IPlan): string => {
  const buffer = plan.buffer ? ` (${plan.targetPoints - plan.buffer} + ${STUDY_PLAN_TEXT.buffer} ${plan.buffer})` : "";
  const points = `${STUDY_PLAN_TEXT.collect} ${plan.targetPoints} ${STUDY_PLAN_TEXT.points}${buffer}`;
  const close = plan.exam
    ? `${STUDY_PLAN_TEXT.closeAll} ${plan.total}`
    : `${STUDY_PLAN_TEXT.closeAtLeast} ${plan.needClosed} ${STUDY_PLAN_TEXT.of} ${plan.total}`;
  return `${close}, ${points} · ${STUDY_PLAN_TEXT.now} ${plan.doneCount} ${STUDY_PLAN_TEXT.closed}, ${formatNumber(plan.earnedNow)} ${STUDY_PLAN_TEXT.points}`;
};

export const StudyPlan = ({ subject }: IStudyPlanProps) => {
  const today = useToday();
  const plan = buildPlan(subject, today);
  if (!plan) return null;

  const shortfall = plan.targetPoints - plan.projected;
  const short = shortfall > SHORTFALL_TOLERANCE;
  const showLectures = plan.lecturesLeft > 0 && !plan.complete;

  return (
    <Card>
      <CardHeader
        title={plan.goal ? `${STUDY_PLAN_TEXT.examTitle} ${plan.goal}` : STUDY_PLAN_TEXT.passTitle}
        subtitle={describeRule(plan)}
        aside={plan.goal && <GoalControl subjectId={subject.id} goal={plan.goal} />}
      />
      <div className="mt-4">
        <PlanModeControl subjectId={subject.id} mode={plan.mode} />
      </div>
      <p className="mt-2 text-xs text-zinc-500">{PLAN_MODES[plan.mode].hint}</p>
      <div className="mt-4">
        <PlanVerdict plan={plan} />
      </div>
      {(plan.steps.length > 0 || showLectures) && (
        <>
          <ul className="mt-4 space-y-2">
            {plan.steps.map((step) => (
              <PlanStepRow key={step.block.id} step={step} />
            ))}
            {showLectures && <LecturesRow plan={plan} />}
          </ul>
          <p className={joinClassNames("mt-3 text-sm font-medium", short ? "text-rose-600" : "text-emerald-600")}>
            {`${STUDY_PLAN_TEXT.total} ${formatNumber(plan.projected)} ${STUDY_PLAN_TEXT.of} ${plan.targetPoints} ${STUDY_PLAN_TEXT.points}`}
            {short && `, ${STUDY_PLAN_TEXT.shortBy} ${formatNumber(roundUpToHalf(shortfall))}`}
          </p>
        </>
      )}
      {plan.skipped.length > 0 && (
        <p className="mt-4 text-sm text-zinc-500">{`${STUDY_PLAN_TEXT.canSkip} ${plan.skipped.map(({ title }) => title).join(", ")}`}</p>
      )}
    </Card>
  );
};
