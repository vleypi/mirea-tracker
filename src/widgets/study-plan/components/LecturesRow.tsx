import { formatPreciseNumber } from "@/shared/lib";
import { ListRow } from "@/shared/ui";
import type { IPlan } from "@/entities/subject";
import { STUDY_PLAN_TEXT } from "@/widgets/study-plan/constants/study-plan.constant";

interface ILecturesRowProps {
  plan: IPlan;
}

export const LecturesRow = ({ plan }: ILecturesRowProps) => (
  <ListRow>
    <div>
      <p className="text-sm font-medium">{STUDY_PLAN_TEXT.lectures}</p>
      <p className="text-xs text-zinc-500">
        {`${STUDY_PLAN_TEXT.lecturesLeft} ${plan.lecturesLeft}, ${STUDY_PLAN_TEXT.perLecture} ${formatPreciseNumber(plan.perLecture)} ${STUDY_PLAN_TEXT.perLectureUnit}`}
      </p>
    </div>
    <span className="text-sm text-zinc-700 tabular-nums">
      {plan.lectures > 0 ? (
        <>
          {`${STUDY_PLAN_TEXT.attendLectures} `}
          <b>{plan.lectures}</b>
          {` ${STUDY_PLAN_TEXT.of} ${plan.lecturesLeft}, ${STUDY_PLAN_TEXT.skipRest}`}
        </>
      ) : (
        STUDY_PLAN_TEXT.noLecturesNeeded
      )}
    </span>
  </ListRow>
);
