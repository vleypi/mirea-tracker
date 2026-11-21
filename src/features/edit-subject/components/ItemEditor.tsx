"use client";

import { IconButton } from "@/shared/ui";
import { type IResolvedItem, subjectStore } from "@/entities/subject";
import { TitleInput } from "@/features/edit-subject/components/TitleInput";
import { EDIT_SUBJECT_TEXT } from "@/features/edit-subject/constants/edit-subject.constant";

interface IItemEditorProps {
  subjectId: string;
  blockId: string;
  item: IResolvedItem;
  autoFocus: boolean;
}

export const ItemEditor = ({ subjectId, blockId, item, autoFocus }: IItemEditorProps) => (
  <li className="flex items-center gap-2">
    <TitleInput
      label={EDIT_SUBJECT_TEXT.itemTitleLabel}
      value={item.title}
      autoFocus={autoFocus}
      onCommit={(title) => subjectStore.updateItem(subjectId, blockId, item.id, { title })}
    />
    <IconButton
      icon="trash"
      variant="danger"
      label={EDIT_SUBJECT_TEXT.removeItem}
      onClick={() => subjectStore.removeItem(subjectId, blockId, item.id)}
    />
  </li>
);
