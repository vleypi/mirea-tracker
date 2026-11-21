"use client";

import { type ISegmentedOption, Segmented } from "@/shared/ui";
import { type Grade, GRADE_POINTS, GRADES, subjectStore } from "@/entities/subject";
import { CHOOSE_PLAN_TEXT } from "@/features/choose-plan/constants/choose-plan.constant";

interface IGoalControlProps {
  subjectId: string;
  goal: Grade;
}

const GOAL_OPTIONS: ISegmentedOption<Grade>[] = GRADES.map((grade) => ({
  value: grade,
  label: `${CHOOSE_PLAN_TEXT.wantGrade} ${grade} (${GRADE_POINTS[grade]})`,
}));

export const GoalControl = ({ subjectId, goal }: IGoalControlProps) => (
  <Segmented options={GOAL_OPTIONS} value={goal} onChange={(value) => subjectStore.updateSubject(subjectId, { goal: value })} />
);
