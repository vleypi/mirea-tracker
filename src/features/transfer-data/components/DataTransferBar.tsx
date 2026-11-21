import type { ReactNode } from "react";
import { ExportDataButton } from "@/features/transfer-data/components/ExportDataButton";
import { ImportDataButton } from "@/features/transfer-data/components/ImportDataButton";
import { TRANSFER_DATA_TEXT } from "@/features/transfer-data/constants/transfer-data.constant";

interface IDataTransferBarProps {
  children?: ReactNode;
}

export const DataTransferBar = ({ children }: IDataTransferBarProps) => (
  <footer className="mt-12 flex flex-col items-center gap-2 text-sm text-zinc-500 sm:flex-row sm:justify-center">
    <span>{TRANSFER_DATA_TEXT.note}</span>
    <div className="flex flex-wrap justify-center gap-1">
      {children}
      <ExportDataButton />
      <ImportDataButton />
    </div>
  </footer>
);
