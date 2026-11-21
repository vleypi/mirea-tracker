"use client";

import { type ISegmentedOption, Segmented } from "@/shared/ui";
import { PLAN_MODE_KEYS, PLAN_MODES, type PlanMode, subjectStore } from "@/entities/subject";

interface IPlanModeControlProps {
  subjectId: string;
  mode: PlanMode;
}

const MODE_OPTIONS: ISegmentedOption<PlanMode>[] = PLAN_MODE_KEYS.map((mode) => ({ value: mode, label: PLAN_MODES[mode].label }));

export const PlanModeControl = ({ subjectId, mode }: IPlanModeControlProps) => (
  <Segmented options={MODE_OPTIONS} value={mode} onChange={(value) => subjectStore.updateSubject(subjectId, { planMode: value })} wrap />
);
