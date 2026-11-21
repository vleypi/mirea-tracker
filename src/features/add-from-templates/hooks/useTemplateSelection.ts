"use client";

import { useState } from "react";

export const useTemplateSelection = (availableIds: string[]) => {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const selectedIds = availableIds.filter((id) => selected.has(id));
  const allSelected = availableIds.length > 0 && selectedIds.length === availableIds.length;

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const toggleAll = () => setSelected(new Set(allSelected ? [] : availableIds));

  return { selectedIds, allSelected, isSelected: (id: string) => selected.has(id), toggle, toggleAll };
};
