import type { ChangeEvent, RefObject } from "react";
import { IMPORT_ACCEPT } from "@/features/transfer-data/constants/transfer-data.constant";

interface IImportFileInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ImportFileInput = ({ inputRef, onChange }: IImportFileInputProps) => (
  <input ref={inputRef} type="file" accept={IMPORT_ACCEPT} className="hidden" onChange={onChange} />
);
