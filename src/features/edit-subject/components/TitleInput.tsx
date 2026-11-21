import { CONTROL_CLASS_NAME } from "@/shared/ui";
import { toTitle } from "@/features/edit-subject/utils/title-input.util";

interface ITitleInputProps {
  label: string;
  value: string;
  onCommit: (title: string) => void;
  autoFocus?: boolean;
}

export const TitleInput = ({ label, value, onCommit, autoFocus }: ITitleInputProps) => (
  <input
    type="text"
    aria-label={label}
    defaultValue={value}
    autoFocus={autoFocus}
    onFocus={(event) => autoFocus && event.target.select()}
    onChange={(event) => onCommit(toTitle(event.target.value))}
    className={CONTROL_CLASS_NAME}
  />
);
