"use client";

import { useState } from "react";
import { APP_TEXT, ROUTES } from "@/shared/config";
import { BackLink, Button, EmptyState, PageShell } from "@/shared/ui";
import { useResolvedSubjects } from "@/entities/subject";
import { SubjectEditor } from "@/features/edit-subject";
import { SubjectSummary } from "@/widgets/subject-summary";
import { SubjectProgress } from "@/views/subject/components/SubjectProgress";
import { SUBJECT_PAGE_TEXT } from "@/views/subject/constants/subject-page.constant";

interface ISubjectPageProps {
  subjectId: string;
  initialEditing: boolean;
}

export const SubjectPage = ({ subjectId, initialEditing }: ISubjectPageProps) => {
  const subjects = useResolvedSubjects();
  const [editing, setEditing] = useState(initialEditing);
  const subject = subjects?.find(({ id }) => id === subjectId);

  return (
    <PageShell>
      <div className="flex items-center justify-between gap-4">
        <BackLink href={ROUTES.home} label={SUBJECT_PAGE_TEXT.back} />
        {subject && (
          <Button variant={editing ? "primary" : "secondary"} aria-pressed={editing} onClick={() => setEditing(!editing)}>
            {editing ? SUBJECT_PAGE_TEXT.done : SUBJECT_PAGE_TEXT.edit}
          </Button>
        )}
      </div>

      {subjects && !subject && (
        <>
          <title>{`${SUBJECT_PAGE_TEXT.notFound} · ${APP_TEXT.title}`}</title>
          <EmptyState title={SUBJECT_PAGE_TEXT.notFound} description={SUBJECT_PAGE_TEXT.notFoundHint} />
        </>
      )}

      {subject && (
        <>
          <title>{`${subject.title} · ${APP_TEXT.title}`}</title>
          <SubjectSummary subject={subject} />
          <div className="mt-6 space-y-4">
            {editing ? (
              <SubjectEditor subject={subject} />
            ) : (
              <SubjectProgress subject={subject} onStartEditing={() => setEditing(true)} />
            )}
          </div>
        </>
      )}
    </PageShell>
  );
};
