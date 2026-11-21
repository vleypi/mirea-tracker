import { ROUTES } from "@/shared/config";
import { pluralize } from "@/shared/lib";
import { ActionTile } from "@/shared/ui";
import { SUBJECT_FORMS, SUBJECT_TEMPLATES } from "@/entities/subject";
import { CreateSubjectAction } from "@/features/add-subject";
import { ImportDataAction } from "@/features/transfer-data";
import { HOME_TEXT } from "@/views/home/constants/home.constant";

const TEMPLATES_COUNT = SUBJECT_TEMPLATES.length;

export const HomeOnboarding = () => (
  <section className="mt-10">
    <h2 className="text-lg font-semibold">{HOME_TEXT.emptyTitle}</h2>
    <p className="mt-1 text-sm text-zinc-500">{HOME_TEXT.emptyDescription}</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <ActionTile
        href={ROUTES.templates}
        icon="listCheck"
        title={HOME_TEXT.templatesTitle}
        description={`${TEMPLATES_COUNT} ${pluralize(TEMPLATES_COUNT, SUBJECT_FORMS)} ${HOME_TEXT.templatesDescription}`}
        emphasized
      />
      <CreateSubjectAction />
      <ImportDataAction />
    </div>
  </section>
);
