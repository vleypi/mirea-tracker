import { APP_TEXT, ROUTES } from "@/shared/config";
import { ButtonLink, Icon } from "@/shared/ui";

export const AddSubjectButton = () => (
  <ButtonLink href={ROUTES.newSubject} variant="primary" size="lg">
    <Icon name="plus" className="size-5" />
    {APP_TEXT.newSubject}
  </ButtonLink>
);
