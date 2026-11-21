import { APP_TEXT, ROUTES } from "@/shared/config";
import { BackLink, PageShell } from "@/shared/ui";
import { TemplatePicker } from "@/features/add-from-templates";
import { TEMPLATES_PAGE_TEXT } from "@/views/templates/constants/templates-page.constant";

export const TemplatesPage = () => (
  <PageShell width="wide">
    <BackLink href={ROUTES.home} label={TEMPLATES_PAGE_TEXT.back} />
    <header className="mt-6 mb-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{APP_TEXT.templates}</h1>
      <p className="mt-3 max-w-xl text-zinc-500 text-pretty">{TEMPLATES_PAGE_TEXT.description}</p>
    </header>
    <TemplatePicker />
  </PageShell>
);
