"use client";

import { ListRow } from "@/shared/ui";
import { type IResolvedItem, StatusControl, StatusDot, subjectStore } from "@/entities/subject";

interface IItemRowProps {
  subjectId: string;
  blockId: string;
  item: IResolvedItem;
}

export const ItemRow = ({ subjectId, blockId, item }: IItemRowProps) => (
  <ListRow>
    <span className="flex items-center gap-3 text-sm font-medium">
      <StatusDot status={item.status} />
      {item.title}
    </span>
    <StatusControl value={item.status} onChange={(status) => subjectStore.updateItem(subjectId, blockId, item.id, { status })} />
  </ListRow>
);
