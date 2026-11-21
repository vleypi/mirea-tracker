import { APP_TEXT, ROUTES } from "@/shared/config";
import { BackLink, PageShell } from "@/shared/ui";
import { NewSubjectForm } from "@/features/add-subject";
import { NEW_SUBJECT_PAGE_TEXT } from "@/views/new-subject/constants/new-subject-page.constant";

export const NewSubjectPage = () => (
  <PageShell>
    <BackLink href={ROUTES.home} label={NEW_SUBJECT_PAGE_TEXT.back} />
    <header className="mt-6 mb-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{APP_TEXT.newSubject}</h1>
      <p className="mt-2 text-zinc-500">{NEW_SUBJECT_PAGE_TEXT.description}</p>
    </header>
    <NewSubjectForm />
  </PageShell>
);
