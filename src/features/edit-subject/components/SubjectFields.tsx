"use client";

import { Card, Field } from "@/shared/ui";
import { type IResolvedSubject, KindSelect, subjectStore } from "@/entities/subject";
import { TitleInput } from "@/features/edit-subject/components/TitleInput";
import { EDIT_SUBJECT_TEXT } from "@/features/edit-subject/constants/edit-subject.constant";

interface ISubjectFieldsProps {
  subject: IResolvedSubject;
}

export const SubjectFields = ({ subject }: ISubjectFieldsProps) => (
  <Card>
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
      <Field label={EDIT_SUBJECT_TEXT.subjectTitle}>
        <TitleInput
          label={EDIT_SUBJECT_TEXT.subjectTitleLabel}
          value={subject.title}
          onCommit={(title) => subjectStore.updateSubject(subject.id, { title })}
        />
      </Field>
      <Field label={EDIT_SUBJECT_TEXT.kind}>
        <KindSelect value={subject.kind} onChange={(kind) => subjectStore.updateSubject(subject.id, { kind })} />
      </Field>
    </div>
  </Card>
);
