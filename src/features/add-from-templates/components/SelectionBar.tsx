import { pluralize } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { SUBJECT_FORMS } from "@/entities/subject";
import { ADD_FROM_TEMPLATES_TEXT } from "@/features/add-from-templates/constants/add-from-templates.constant";

interface ISelectionBarProps {
  count: number;
  onAdd: () => void;
}

export const SelectionBar = ({ count, onAdd }: ISelectionBarProps) => (
  <div className="pointer-events-none sticky bottom-6 mt-8 flex justify-center">
    <div className="pointer-events-auto flex items-center gap-5 rounded-full bg-zinc-900 py-2 pr-2 pl-6 text-white shadow-2xl shadow-zinc-900/30">
      <span className="text-sm tabular-nums">{`${ADD_FROM_TEMPLATES_TEXT.selected} ${count} ${pluralize(count, SUBJECT_FORMS)}`}</span>
      <Button variant="inverse" onClick={onAdd}>
        {ADD_FROM_TEMPLATES_TEXT.add}
      </Button>
    </div>
  </div>
);
