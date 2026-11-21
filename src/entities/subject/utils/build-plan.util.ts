import { EPSILON, roundUpToHalf, sum } from "@/shared/lib";
import {
  DEFAULT_GRADE,
  DEFAULT_PLAN_MODE,
  GRADE_POINTS,
  PASS_POINTS,
  PASS_SHARE,
  SAFE_BUFFER,
  SCORE_HEADROOM,
} from "@/entities/subject/constants/plan.constant";
import { EXAM_KIND } from "@/entities/subject/constants/subject.constant";
import type { IPlan, IPlanStep } from "@/entities/subject/interfaces/plan.interface";
import type { IResolvedBlock, IResolvedSubject } from "@/entities/subject/interfaces/subject.interface";
import { getAttendanceStats } from "@/entities/subject/utils/attendance.util";

const dueTime = (block: IResolvedBlock): number => block.due?.end.getTime() ?? Infinity;

const byDeadline = (first: IResolvedBlock, second: IResolvedBlock): number => dueTime(first) - dueTime(second) || first.required - second.required;

export const getLatePenalty = (block: IResolvedBlock): number => (block.overdue ? block.items.length : 0);

const getGain = (block: IResolvedBlock): number => Math.max(block.required, block.points - getLatePenalty(block)) - block.points;

const getCost = (block: IResolvedBlock): number => Math.max(0, block.required + getLatePenalty(block) - block.points);

const byCost = (first: IResolvedBlock, second: IResolvedBlock): number => getCost(first) - getCost(second) || byDeadline(first, second);

export const buildPlan = (subject: IResolvedSubject, today: Date): IPlan | null => {
  const { blocks } = subject;
  if (!blocks.length) return null;

  const mode = subject.planMode ?? DEFAULT_PLAN_MODE;
  const exam = subject.kind === EXAM_KIND;
  const goal = exam ? (subject.goal ?? DEFAULT_GRADE) : null;
  const buffer = mode === "safe" ? SAFE_BUFFER : 0;
  const targetPoints = (goal ? GRADE_POINTS[goal] : PASS_POINTS) + buffer;
  const needClosed = exam ? blocks.length : Math.ceil(blocks.length * PASS_SHARE);

  const stats = subject.attendance ? getAttendanceStats(subject.attendance) : null;
  const lecturesLeft = stats && mode !== "nolectures" ? stats.left : 0;
  const perLecture = stats?.perLecture ?? 0;

  const open = blocks.filter((block) => block.status !== "done").sort(mode === "cheap" ? byCost : byDeadline);
  const doneCount = blocks.length - open.length;
  const earnedNow = sum(blocks.map((block) => block.points)) + (stats?.points ?? 0);

  const evaluate = (chosen: IResolvedBlock[]) => {
    const gap = Math.max(0, targetPoints - earnedNow - sum(chosen.map(getGain)));
    const lectures = perLecture > 0 ? Math.min(lecturesLeft, Math.max(0, Math.ceil(gap / perLecture - EPSILON))) : 0;
    return {
      lectures,
      extra: Math.max(0, gap - lectures * perLecture),
      capacity: sum(chosen.map((block) => Math.max(block.required, block.points) * (SCORE_HEADROOM - 1))),
    };
  };

  const chosen = open.slice(0, Math.max(0, needClosed - doneCount));
  let result = evaluate(chosen);

  while (result.extra > result.capacity + EPSILON && chosen.length < open.length) {
    chosen.push(open[chosen.length]);
    result = evaluate(chosen);
  }
  chosen.sort(byDeadline);

  const { lectures, extra } = result;
  const weight = sum(chosen.map((block) => block.required));

  const steps = chosen.map((block): IPlanStep => {
    const penalty = getLatePenalty(block);
    const share = weight ? (extra * block.required) / weight : extra / chosen.length;
    const target = roundUpToHalf(block.points + getGain(block) + share);
    return { block, target, penalty, left: Math.max(0, target + penalty - block.points) };
  });

  const projected = earnedNow + sum(steps.map(({ block, target }) => target - block.points)) + lectures * perLecture;
  const finish = chosen.length && chosen.every((block) => block.due) ? new Date(Math.max(today.getTime(), ...chosen.map(dueTime))) : null;

  return {
    mode,
    exam,
    goal,
    buffer,
    targetPoints,
    needClosed,
    total: blocks.length,
    doneCount,
    earnedNow,
    projected,
    steps,
    skipped: open.filter((block) => !chosen.includes(block)),
    lectures,
    lecturesLeft,
    perLecture,
    extra,
    finish,
    complete: chosen.length === 0 && lectures === 0 && extra === 0,
    stuck: chosen.length === 0 && extra > 0,
  };
};
