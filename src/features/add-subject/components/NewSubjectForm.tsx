"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ROUTES } from "@/shared/config";
import { Button, ButtonLink, Card, CONTROL_CLASS_NAME, Field } from "@/shared/ui";
import { KindSelect, type SubjectKind, subjectStore } from "@/entities/subject";
import { ADD_SUBJECT_TEXT, NON_BLANK_PATTERN } from "@/features/add-subject/constants/add-subject.constant";

export const NewSubjectForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<SubjectKind | null>(null);

  const create = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.replace(ROUTES.subjectEditor(subjectStore.addSubject({ title: title.trim(), kind })));
  };

  return (
    <form onSubmit={create}>
      <Card>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
          <Field label={ADD_SUBJECT_TEXT.title}>
            <input
              type="text"
              required
              autoFocus
              pattern={NON_BLANK_PATTERN}
              title={ADD_SUBJECT_TEXT.titleRequired}
              placeholder={ADD_SUBJECT_TEXT.titlePlaceholder}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={CONTROL_CLASS_NAME}
            />
          </Field>
          <Field label={ADD_SUBJECT_TEXT.kind}>
            <KindSelect value={kind} onChange={setKind} />
          </Field>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <ButtonLink href={ROUTES.home} variant="ghost">
            {ADD_SUBJECT_TEXT.cancel}
          </ButtonLink>
          <Button type="submit" variant="primary">
            {ADD_SUBJECT_TEXT.create}
          </Button>
        </div>
      </Card>
    </form>
  );
};
