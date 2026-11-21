"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import { SUBJECT_TEMPLATES, subjectStore, useSubjects } from "@/entities/subject";
import { SelectionBar } from "@/features/add-from-templates/components/SelectionBar";
import { TemplateOption } from "@/features/add-from-templates/components/TemplateOption";
import { ADD_FROM_TEMPLATES_TEXT } from "@/features/add-from-templates/constants/add-from-templates.constant";
import { useTemplateSelection } from "@/features/add-from-templates/hooks/useTemplateSelection";

export const TemplatePicker = () => {
  const router = useRouter();
  const subjects = useSubjects();
  const existingIds = new Set(subjects?.map(({ id }) => id));
  const availableIds = SUBJECT_TEMPLATES.map(({ id }) => id).filter((id) => !existingIds.has(id));
  const selection = useTemplateSelection(availableIds);

  if (!subjects) return null;

  const add = () => {
    subjectStore.addSubjects(SUBJECT_TEMPLATES.filter(({ id }) => selection.selectedIds.includes(id)));
    router.push(ROUTES.home);
  };

  return (
    <>
      <div className="mb-4 flex min-h-10 items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          {availableIds.length
            ? `${ADD_FROM_TEMPLATES_TEXT.available} ${availableIds.length} ${ADD_FROM_TEMPLATES_TEXT.of} ${SUBJECT_TEMPLATES.length}`
            : ADD_FROM_TEMPLATES_TEXT.allAdded}
        </p>
        {availableIds.length > 0 && (
          <Button variant="ghost" onClick={selection.toggleAll}>
            {selection.allSelected ? ADD_FROM_TEMPLATES_TEXT.clear : ADD_FROM_TEMPLATES_TEXT.selectAll}
          </Button>
        )}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {SUBJECT_TEMPLATES.map((template) => (
          <TemplateOption
            key={template.id}
            template={template}
            added={existingIds.has(template.id)}
            selected={selection.isSelected(template.id)}
            onToggle={() => selection.toggle(template.id)}
          />
        ))}
      </ul>
      {selection.selectedIds.length > 0 && <SelectionBar count={selection.selectedIds.length} onAdd={add} />}
    </>
  );
};
