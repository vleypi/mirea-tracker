"use client";

import { type ISegmentedOption, Segmented } from "@/shared/ui";
import { MARK_LABELS, MARKS, type Mark } from "@/entities/subject";
import { MARK_ATTENDANCE_TEXT } from "@/features/mark-attendance/constants/mark-attendance.constant";

interface ILectureRowProps {
  index: number;
  mark: Mark | null;
  onChange: (mark: Mark) => void;
}

const MARK_OPTIONS: ISegmentedOption<Mark>[] = MARKS.map((mark) => ({
  value: mark,
  label: MARK_LABELS[mark].label,
  title: MARK_LABELS[mark].title,
  activeClassName: MARK_LABELS[mark].active,
}));

export const LectureRow = ({ index, mark, onChange }: ILectureRowProps) => (
  <li className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-50 px-4 py-3">
    <span className="text-sm font-medium">{`${MARK_ATTENDANCE_TEXT.lecture} ${index + 1}`}</span>
    <Segmented options={MARK_OPTIONS} value={mark} onChange={onChange} size="icon" />
  </li>
);
