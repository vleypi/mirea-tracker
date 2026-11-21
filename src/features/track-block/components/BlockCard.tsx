"use client";

import { Card } from "@/shared/ui";
import { DueLabel, type IResolvedBlock, StatusControl, subjectStore } from "@/entities/subject";
import { ItemRow } from "@/features/track-block/components/ItemRow";
import { PointsStepper } from "@/features/track-block/components/PointsStepper";

interface IBlockCardProps {
  subjectId: string;
  block: IResolvedBlock;
}

export const BlockCard = ({ subjectId, block }: IBlockCardProps) => (
  <Card>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">{block.title}</h2>
        <p className="mt-1">
          <DueLabel block={block} detailed />
        </p>
      </div>
      <PointsStepper subjectId={subjectId} block={block} />
    </div>
    <div className="mt-5">
      <StatusControl value={block.status} onChange={(status) => subjectStore.updateBlock(subjectId, block.id, { status })} />
    </div>
    {block.items.length > 0 && (
      <ul className="mt-5 space-y-2">
        {block.items.map((item) => (
          <ItemRow key={item.id} subjectId={subjectId} blockId={block.id} item={item} />
        ))}
      </ul>
    )}
  </Card>
);
