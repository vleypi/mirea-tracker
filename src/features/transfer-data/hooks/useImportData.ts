"use client";

import { type ChangeEvent, useRef } from "react";
import { parseSubjects, subjectStore } from "@/entities/subject";
import { TRANSFER_DATA_TEXT } from "@/features/transfer-data/constants/transfer-data.constant";

const readSubjects = async (file: File) => {
  try {
    return parseSubjects(JSON.parse(await file.text()));
  } catch {
    return null;
  }
};

export const useImportData = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const subjects = await readSubjects(file);
    if (!subjects) {
      alert(TRANSFER_DATA_TEXT.invalidFile);
      return;
    }
    if (!subjectStore.getSnapshot().length || confirm(TRANSFER_DATA_TEXT.confirmImport)) subjectStore.replaceAll(subjects);
  };

  return { inputRef, handleChange, open: () => inputRef.current?.click() };
};
