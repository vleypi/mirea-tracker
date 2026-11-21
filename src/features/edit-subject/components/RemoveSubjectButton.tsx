"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import { subjectStore } from "@/entities/subject";
import { EDIT_SUBJECT_TEXT } from "@/features/edit-subject/constants/edit-subject.constant";

interface IRemoveSubjectButtonProps {
  subjectId: string;
}

export const RemoveSubjectButton = ({ subjectId }: IRemoveSubjectButtonProps) => {
  const router = useRouter();

  const remove = () => {
    if (!confirm(EDIT_SUBJECT_TEXT.confirmRemoveSubject)) return;
    router.replace(ROUTES.home);
    subjectStore.removeSubject(subjectId);
  };

  return (
    <div className="flex justify-center pt-4">
      <Button variant="danger" onClick={remove}>
        {EDIT_SUBJECT_TEXT.removeSubject}
      </Button>
    </div>
  );
};
