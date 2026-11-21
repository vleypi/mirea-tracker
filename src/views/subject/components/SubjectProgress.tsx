import { Button, Card } from "@/shared/ui";
import type { IResolvedSubject } from "@/entities/subject";
import { AttendanceCard } from "@/features/mark-attendance";
import { ResetMarksButton } from "@/features/reset-marks";
import { BlockCard } from "@/features/track-block";
import { StudyPlan } from "@/widgets/study-plan";
import { SUBJECT_PAGE_TEXT } from "@/views/subject/constants/subject-page.constant";

interface ISubjectProgressProps {
  subject: IResolvedSubject;
  onStartEditing: () => void;
}

export const SubjectProgress = ({ subject, onStartEditing }: ISubjectProgressProps) => {
  if (!subject.blocks.length && !subject.attendance) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-4 p-4 text-center">
          <p className="text-zinc-500">{SUBJECT_PAGE_TEXT.noBlocks}</p>
          <Button variant="primary" onClick={onStartEditing}>
            {SUBJECT_PAGE_TEXT.addBlocks}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <StudyPlan subject={subject} />
      {subject.blocks.map((block) => (
        <BlockCard key={block.id} subjectId={subject.id} block={block} />
      ))}
      {subject.attendance && <AttendanceCard subjectId={subject.id} attendance={subject.attendance} />}
      <ResetMarksButton subjectId={subject.id} />
    </>
  );
};
