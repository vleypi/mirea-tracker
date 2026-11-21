import { formatNumber, joinClassNames } from "@/shared/lib";
import { ListRow } from "@/shared/ui";
import type { IPlanStep } from "@/entities/subject";
import { STUDY_PLAN_TEXT } from "@/widgets/study-plan/constants/study-plan.constant";

interface IPlanStepRowProps {
  step: IPlanStep;
}

export const PlanStepRow = ({ step: { block, target, left, penalty } }: IPlanStepRowProps) => (
  <ListRow>
    <div>
      <p className="text-sm font-medium">{block.title}</p>
      <p className={joinClassNames("text-xs", block.overdue ? "font-medium text-rose-600" : "text-zinc-500")}>
        {block.due ? `${block.overdue ? STUDY_PLAN_TEXT.duePassed : STUDY_PLAN_TEXT.before} ${block.due.label}` : STUDY_PLAN_TEXT.noDue}
      </p>
    </div>
    <span className="text-sm text-zinc-700 tabular-nums">
      {left > 0 ? (
        <>
          {`${STUDY_PLAN_TEXT.collectMore} `}
          <b>{formatNumber(left)}</b>
          {` (${STUDY_PLAN_TEXT.target} ${formatNumber(target)}${penalty ? ` + ${STUDY_PLAN_TEXT.penalty} ${penalty}` : ""})`}
        </>
      ) : (
        `${STUDY_PLAN_TEXT.enoughPoints}${penalty ? `, ${STUDY_PLAN_TEXT.penalty} −${penalty}` : ""}`
      )}
    </span>
  </ListRow>
);
