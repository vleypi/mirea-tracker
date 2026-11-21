import { ROUTES } from "@/shared/config";
import { ActionTile } from "@/shared/ui";
import { ADD_SUBJECT_TEXT } from "@/features/add-subject/constants/add-subject.constant";

export const CreateSubjectAction = () => (
  <ActionTile href={ROUTES.newSubject} icon="plus" title={ADD_SUBJECT_TEXT.createTitle} description={ADD_SUBJECT_TEXT.createDescription} />
);
