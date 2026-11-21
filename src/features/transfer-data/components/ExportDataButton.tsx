"use client";

import { downloadJson, toDateInputValue } from "@/shared/lib";
import { Button, Icon } from "@/shared/ui";
import { subjectStore } from "@/entities/subject";
import { EXPORT_FILE_PREFIX, TRANSFER_DATA_TEXT } from "@/features/transfer-data/constants/transfer-data.constant";

export const ExportDataButton = () => (
  <Button
    variant="ghost"
    onClick={() => downloadJson(`${EXPORT_FILE_PREFIX}-${toDateInputValue(new Date())}.json`, subjectStore.getSnapshot())}
  >
    <Icon name="download" />
    {TRANSFER_DATA_TEXT.export}
  </Button>
);
