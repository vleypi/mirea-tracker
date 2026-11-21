"use client";

import { formatPreciseNumber } from "@/shared/lib";
import { Card, CardHeader } from "@/shared/ui";
import { getAttendanceStats, type IAttendance, type Mark, subjectStore } from "@/entities/subject";
import { LectureRow } from "@/features/mark-attendance/components/LectureRow";
import { MARK_ATTENDANCE_TEXT } from "@/features/mark-attendance/constants/mark-attendance.constant";

interface IAttendanceCardProps {
  subjectId: string;
  attendance: IAttendance;
}

export const AttendanceCard = ({ subjectId, attendance }: IAttendanceCardProps) => {
  const stats = getAttendanceStats(attendance);

  const toggleMark = (index: number, mark: Mark) => {
    const marks = attendance.marks.map((current, position) => (position === index ? (current === mark ? null : mark) : current));
    subjectStore.updateSubject(subjectId, { attendance: { ...attendance, marks } });
  };

  return (
    <Card>
      <CardHeader
        title={MARK_ATTENDANCE_TEXT.title}
        subtitle={`${formatPreciseNumber(stats.perLecture)} ${MARK_ATTENDANCE_TEXT.perLecture} · ${MARK_ATTENDANCE_TEXT.counted} ${stats.counted} ${MARK_ATTENDANCE_TEXT.of} ${stats.total}${
          stats.excused ? `, ${MARK_ATTENDANCE_TEXT.excused} ${stats.excused}` : ""
        }`}
        aside={
          <span className="text-sm font-semibold tabular-nums">
            {`${formatPreciseNumber(stats.points)} / ${formatPreciseNumber(stats.max)} ${MARK_ATTENDANCE_TEXT.points}`}
          </span>
        }
      />
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {attendance.marks.map((mark, index) => (
          <LectureRow key={index} index={index} mark={mark} onChange={(value) => toggleMark(index, value)} />
        ))}
      </ul>
    </Card>
  );
};
