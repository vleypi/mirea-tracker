"use client";

import { useState } from "react";
import { APP_TEXT, ROUTES } from "@/shared/config";
import { useToday } from "@/shared/lib";
import { ButtonLink, Icon, PageShell, SearchField } from "@/shared/ui";
import { SubjectCard, useResolvedSubjects } from "@/entities/subject";
import { AddSubjectButton } from "@/features/add-subject";
import { DataTransferBar } from "@/features/transfer-data";
import { SubjectsOverview } from "@/widgets/subjects-overview";
import { HomeOnboarding } from "@/views/home/components/HomeOnboarding";
import { HOME_TEXT } from "@/views/home/constants/home.constant";

export const HomePage = () => {
  const subjects = useResolvedSubjects();
  const today = useToday();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visible = subjects?.filter(({ title }) => title.toLowerCase().includes(normalizedQuery)) ?? [];

  return (
    <PageShell width="wide">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{APP_TEXT.semester}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{APP_TEXT.title}</h1>
        </div>
        {subjects && <SubjectsOverview subjects={subjects} />}
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <SearchField label={HOME_TEXT.searchLabel} placeholder={HOME_TEXT.searchPlaceholder} value={query} onChange={setQuery} />
        <ButtonLink href={ROUTES.checklist} size="lg">
          <Icon name="listCheck" className="size-5" />
          {APP_TEXT.checklist}
        </ButtonLink>
        <AddSubjectButton />
      </div>

      {subjects?.length === 0 && <HomeOnboarding />}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {visible.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} today={today} />
        ))}
      </ul>
      {subjects?.length && !visible.length ? <p className="mt-16 text-center text-zinc-500">{HOME_TEXT.nothingFound}</p> : null}

      <DataTransferBar>
        <ButtonLink href={ROUTES.templates} variant="ghost">
          {HOME_TEXT.templates}
        </ButtonLink>
      </DataTransferBar>
    </PageShell>
  );
};
