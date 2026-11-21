"use client";

import { Button, Icon } from "@/shared/ui";
import { ImportFileInput } from "@/features/transfer-data/components/ImportFileInput";
import { TRANSFER_DATA_TEXT } from "@/features/transfer-data/constants/transfer-data.constant";
import { useImportData } from "@/features/transfer-data/hooks/useImportData";

export const ImportDataButton = () => {
  const { inputRef, handleChange, open } = useImportData();
  return (
    <>
      <Button variant="ghost" onClick={open}>
        <Icon name="upload" />
        {TRANSFER_DATA_TEXT.import}
      </Button>
      <ImportFileInput inputRef={inputRef} onChange={handleChange} />
    </>
  );
};
