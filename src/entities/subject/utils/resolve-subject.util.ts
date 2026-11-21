import { formatDay, formatMonth, parseMonthOrDay, sum } from "@/shared/lib";
import type { IDue, IResolvedBlock, IResolvedSubject, ISubject, ISubjectSummary } from "@/entities/subject/interfaces/subject.interface";
import { getAttendanceStats } from "@/entities/subject/utils/attendance.util";

const resolveDue = (value: string): IDue => {
  const { end, hasDay } = parseMonthOrDay(value);
  return { end, label: hasDay ? formatDay(end) : formatMonth(end) };
};

const summarize = (blocks: IResolvedBlock[], attendance: ISubject["attendance"], today: Date): ISubjectSummary => {
  const units = blocks.flatMap((block) => [block, ...block.items]);
  const count = (predicate: (unit: (typeof units)[number]) => boolean) => units.filter(predicate).length;
  const visits = attendance ? getAttendanceStats(attendance) : null;
  const upcoming = blocks
    .filter((block) => block.status !== "done" && block.due && block.due.end >= today)
    .sort((first, second) => (first.due?.end.getTime() ?? 0) - (second.due?.end.getTime() ?? 0));

  return {
    total: units.length,
    done: count((unit) => unit.status === "done"),
    submitted: count((unit) => unit.status === "submitted"),
    overdue: count((unit) => unit.overdue),
    points: sum(blocks.map((block) => block.points)) + (visits?.points ?? 0),
    required: sum(blocks.map((block) => block.required)) + (visits?.max ?? 0),
    next: upcoming[0] ?? null,
  };
};

export const resolveSubject = (subject: ISubject, today: Date): IResolvedSubject => {
  const blocks = subject.blocks.map((block): IResolvedBlock => {
    const due = block.due ? resolveDue(block.due) : null;
    const passed = due !== null && due.end < today;
    return {
      ...block,
      due,
      overdue: passed && block.status !== "done",
      items: block.items.map((item) => ({ ...item, overdue: passed && item.status !== "done" })),
    };
  });

  return { ...subject, blocks, summary: summarize(blocks, subject.attendance, today) };
};
