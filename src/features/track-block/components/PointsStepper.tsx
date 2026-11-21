"use client";

import { formatNumber, joinClassNames } from "@/shared/lib";
import { IconButton } from "@/shared/ui";
import { type IResolvedBlock, subjectStore } from "@/entities/subject";
import { POINT_STEP, TRACK_BLOCK_TEXT } from "@/features/track-block/constants/track-block.constant";

interface IPointsStepperProps {
  subjectId: string;
  block: IResolvedBlock;
}

export const PointsStepper = ({ subjectId, block }: IPointsStepperProps) => {
  const changePoints = (step: number) => subjectStore.updateBlock(subjectId, block.id, { points: Math.max(0, block.points + step) });

  return (
    <div className="flex items-center gap-3 self-start">
      <span className="text-xs text-zinc-500">{TRACK_BLOCK_TEXT.points}</span>
      <div className="flex items-center rounded-full bg-zinc-100 p-1">
        <IconButton icon="minus" label={TRACK_BLOCK_TEXT.decrease} onClick={() => changePoints(-POINT_STEP)} />
        <span className={joinClassNames("min-w-16 text-center text-sm font-semibold tabular-nums", block.points >= block.required && "text-emerald-600")}>
          {`${formatNumber(block.points)} / ${formatNumber(block.required)}`}
        </span>
        <IconButton icon="plus" label={TRACK_BLOCK_TEXT.increase} onClick={() => changePoints(POINT_STEP)} />
      </div>
    </div>
  );
};
