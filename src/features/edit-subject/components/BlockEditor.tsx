"use client";

import { toDateInputValue, toNonNegativeNumber } from "@/shared/lib";
import { Card, CONTROL_CLASS_NAME, Field, Icon, IconButton } from "@/shared/ui";
import { type IResolvedBlock, subjectStore } from "@/entities/subject";
import { ItemEditor } from "@/features/edit-subject/components/ItemEditor";
import { TitleInput } from "@/features/edit-subject/components/TitleInput";
import { EDIT_SUBJECT_TEXT } from "@/features/edit-subject/constants/edit-subject.constant";

interface IBlockEditorProps {
  subjectId: string;
  block: IResolvedBlock;
  focusId: string | null;
  onAddItem: () => void;
}

const POINT_INPUT_STEP = 0.5;

export const BlockEditor = ({ subjectId, block, focusId, onAddItem }: IBlockEditorProps) => {
  const update = (patch: Parameters<typeof subjectStore.updateBlock>[2]) => subjectStore.updateBlock(subjectId, block.id, patch);

  const remove = () => {
    const details = block.items.length ? EDIT_SUBJECT_TEXT.withItems : "";
    if (confirm(`${EDIT_SUBJECT_TEXT.confirmRemoveBlock} ${block.title}${details}?`)) subjectStore.removeBlock(subjectId, block.id);
  };

  return (
    <Card>
      <div className="flex items-start gap-2">
        <div className="grid flex-1 grid-cols-[6rem_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(0,1fr)_8rem_11rem]">
          <div className="col-span-2 sm:col-span-1">
            <Field label={EDIT_SUBJECT_TEXT.blockTitle}>
              <TitleInput
                label={EDIT_SUBJECT_TEXT.blockTitleLabel}
                value={block.title}
                autoFocus={focusId === block.id}
                onCommit={(title) => update({ title })}
              />
            </Field>
          </div>
          <Field label={EDIT_SUBJECT_TEXT.required}>
            <input
              type="number"
              min={0}
              step={POINT_INPUT_STEP}
              inputMode="decimal"
              defaultValue={block.required}
              onChange={(event) => update({ required: toNonNegativeNumber(event.target.value) })}
              className={CONTROL_CLASS_NAME}
            />
          </Field>
          <Field label={EDIT_SUBJECT_TEXT.due}>
            <input
              type="date"
              defaultValue={block.due ? toDateInputValue(block.due.end) : ""}
              onChange={(event) => update({ due: event.target.value || null })}
              className={CONTROL_CLASS_NAME}
            />
          </Field>
        </div>
        <div className="mt-5.5">
          <IconButton icon="trash" variant="danger" label={EDIT_SUBJECT_TEXT.removeBlock} onClick={remove} />
        </div>
      </div>
      {block.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <ItemEditor key={item.id} subjectId={subjectId} blockId={block.id} item={item} autoFocus={focusId === item.id} />
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={onAddItem}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-200 hover:text-zinc-900"
      >
        <Icon name="plus" />
        {EDIT_SUBJECT_TEXT.addItem}
      </button>
    </Card>
  );
};
