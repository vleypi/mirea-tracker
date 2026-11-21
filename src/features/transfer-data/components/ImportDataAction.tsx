"use client";

import { ActionTile } from "@/shared/ui";
import { ImportFileInput } from "@/features/transfer-data/components/ImportFileInput";
import { TRANSFER_DATA_TEXT } from "@/features/transfer-data/constants/transfer-data.constant";
import { useImportData } from "@/features/transfer-data/hooks/useImportData";

export const ImportDataAction = () => {
  const { inputRef, handleChange, open } = useImportData();
  return (
    <>
      <ActionTile icon="upload" title={TRANSFER_DATA_TEXT.importTitle} description={TRANSFER_DATA_TEXT.importDescription} onClick={open} />
      <ImportFileInput inputRef={inputRef} onChange={handleChange} />
    </>
  );
};
