import { CONTROL_CLASS_NAME } from "@/shared/ui";
import { SUBJECT_KINDS, SUBJECT_TEXT } from "@/entities/subject/constants/subject.constant";
import type { SubjectKind } from "@/entities/subject/interfaces/subject.interface";

interface IKindSelectProps {
  value: SubjectKind | null;
  onChange: (kind: SubjectKind | null) => void;
}

const toSubjectKind = (value: string): SubjectKind | null => SUBJECT_KINDS.find((kind) => kind === value) ?? null;

export const KindSelect = ({ value, onChange }: IKindSelectProps) => (
  <select value={value ?? ""} onChange={(event) => onChange(toSubjectKind(event.target.value))} className={CONTROL_CLASS_NAME}>
    <option value="">{SUBJECT_TEXT.noKind}</option>
    {SUBJECT_KINDS.map((kind) => (
      <option key={kind}>{kind}</option>
    ))}
  </select>
);
