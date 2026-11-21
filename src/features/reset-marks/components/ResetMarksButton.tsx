"use client";

import { Button } from "@/shared/ui";
import { subjectStore } from "@/entities/subject";
import { RESET_MARKS_TEXT } from "@/features/reset-marks/constants/reset-marks.constant";

interface IResetMarksButtonProps {
  subjectId: string;
}

export const ResetMarksButton = ({ subjectId }: IResetMarksButtonProps) => {
  const reset = () => {
    if (confirm(RESET_MARKS_TEXT.confirm)) subjectStore.resetMarks(subjectId);
  };

  return (
    <div className="flex justify-center pt-4">
      <Button variant="ghost" onClick={reset}>
        {RESET_MARKS_TEXT.reset}
      </Button>
    </div>
  );
};
