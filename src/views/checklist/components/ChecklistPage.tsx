"use client";

import { APP_TEXT, ROUTES } from "@/shared/config";
import { BackLink, EmptyState, PageShell } from "@/shared/ui";
import { useResolvedSubjects } from "@/entities/subject";
import { ChecklistSection } from "@/widgets/subject-checklist";
import { CHECKLIST_PAGE_TEXT } from "@/views/checklist/constants/checklist-page.constant";

export const ChecklistPage = () => {
  const subjects = useResolvedSubjects()?.filter(({ blocks }) => blocks.length);
  const blocks = subjects?.flatMap((subject) => subject.blocks) ?? [];
  const done = blocks.filter((block) => block.status === "done").length;
  const overdue = blocks.filter((block) => block.overdue).length;

  return (
    <PageShell>
      <BackLink href={ROUTES.home} label={CHECKLIST_PAGE_TEXT.back} />
      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{APP_TEXT.checklist}</h1>
        {subjects && (
          <p className="mt-2 text-sm text-zinc-500">
            {`${CHECKLIST_PAGE_TEXT.closed} ${done} ${CHECKLIST_PAGE_TEXT.of} ${blocks.length}`}
            {overdue > 0 && ` · ${CHECKLIST_PAGE_TEXT.overdue} ${overdue}`}
          </p>
        )}
      </header>
      {subjects && !subjects.length && <EmptyState title={CHECKLIST_PAGE_TEXT.empty} />}
      <div className="mt-8 space-y-8">
        {subjects?.map((subject) => (
          <ChecklistSection key={subject.id} subject={subject} />
        ))}
      </div>
    </PageShell>
  );
};
