"use client";

import { useState } from "react";
import { Button, Icon } from "@/shared/ui";
import { type IResolvedSubject, subjectStore } from "@/entities/subject";
import { AttendanceEditor } from "@/features/edit-subject/components/AttendanceEditor";
import { BlockEditor } from "@/features/edit-subject/components/BlockEditor";
import { RemoveSubjectButton } from "@/features/edit-subject/components/RemoveSubjectButton";
import { SubjectFields } from "@/features/edit-subject/components/SubjectFields";
import { EDIT_SUBJECT_TEXT } from "@/features/edit-subject/constants/edit-subject.constant";
import { getNextBlockTitle, getNextItemTitle } from "@/features/edit-subject/utils/next-title.util";

interface ISubjectEditorProps {
  subject: IResolvedSubject;
}

const ATTENDANCE_FOCUS_ID = "attendance";

export const SubjectEditor = ({ subject }: ISubjectEditorProps) => {
  const [focusId, setFocusId] = useState<string | null>(null);

  return (
    <>
      <SubjectFields subject={subject} />
      {subject.blocks.map((block) => (
        <BlockEditor
          key={block.id}
          subjectId={subject.id}
          block={block}
          focusId={focusId}
          onAddItem={() => setFocusId(subjectStore.addItem(subject.id, block.id, getNextItemTitle(subject.blocks, block.id)))}
        />
      ))}
      <Button variant="tile" onClick={() => setFocusId(subjectStore.addBlock(subject.id, getNextBlockTitle(subject.blocks)))}>
        <Icon name="plus" />
        {EDIT_SUBJECT_TEXT.addBlock}
      </Button>
      <AttendanceEditor
        subjectId={subject.id}
        attendance={subject.attendance}
        autoFocus={focusId === ATTENDANCE_FOCUS_ID}
        onAdd={() => setFocusId(ATTENDANCE_FOCUS_ID)}
      />
      <RemoveSubjectButton subjectId={subject.id} />
    </>
  );
};
