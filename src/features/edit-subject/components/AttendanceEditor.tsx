"use client";

import { clamp, toNonNegativeNumber } from "@/shared/lib";
import { Button, Card, CONTROL_CLASS_NAME, Field, Icon, IconButton } from "@/shared/ui";
import { createAttendance, type IAttendance, MAX_LECTURES, subjectStore } from "@/entities/subject";
import { EDIT_SUBJECT_TEXT } from "@/features/edit-subject/constants/edit-subject.constant";

interface IAttendanceEditorProps {
  subjectId: string;
  attendance: IAttendance | null;
  autoFocus: boolean;
  onAdd: () => void;
}

const MIN_LECTURES = 1;
const POINT_INPUT_STEP = 0.5;

export const AttendanceEditor = ({ subjectId, attendance, autoFocus, onAdd }: IAttendanceEditorProps) => {
  if (!attendance) {
    return (
      <Button
        variant="tile"
        onClick={() => {
          subjectStore.updateSubject(subjectId, { attendance: createAttendance() });
          onAdd();
        }}
      >
        <Icon name="plus" />
        {EDIT_SUBJECT_TEXT.addAttendance}
      </Button>
    );
  }

  const update = (patch: Partial<IAttendance>) => subjectStore.updateSubject(subjectId, { attendance: { ...attendance, ...patch } });

  const changeCount = (value: string) => {
    const count = clamp(Math.round(Number(value)) || MIN_LECTURES, MIN_LECTURES, MAX_LECTURES);
    update({ marks: Array.from({ length: count }, (_, index) => attendance.marks[index] ?? null) });
  };

  const remove = () => {
    if (confirm(EDIT_SUBJECT_TEXT.confirmRemoveAttendance)) subjectStore.updateSubject(subjectId, { attendance: null });
  };

  return (
    <Card>
      <div className="flex items-start gap-2">
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          <Field label={EDIT_SUBJECT_TEXT.lectures}>
            <input
              key={attendance.marks.length}
              type="number"
              min={MIN_LECTURES}
              max={MAX_LECTURES}
              step={1}
              inputMode="numeric"
              autoFocus={autoFocus}
              defaultValue={attendance.marks.length}
              onBlur={(event) => changeCount(event.target.value)}
              className={CONTROL_CLASS_NAME}
            />
          </Field>
          <Field label={EDIT_SUBJECT_TEXT.attendancePoints}>
            <input
              type="number"
              min={0}
              step={POINT_INPUT_STEP}
              inputMode="decimal"
              defaultValue={attendance.max}
              onChange={(event) => update({ max: toNonNegativeNumber(event.target.value) })}
              className={CONTROL_CLASS_NAME}
            />
          </Field>
        </div>
        <div className="mt-5.5">
          <IconButton icon="trash" variant="danger" label={EDIT_SUBJECT_TEXT.removeAttendance} onClick={remove} />
        </div>
      </div>
    </Card>
  );
};
