import { z } from "zod";
import { GRADES, PLAN_MODE_KEYS } from "@/entities/subject/constants/plan.constant";
import { MARKS, STATUSES, SUBJECT_KINDS } from "@/entities/subject/constants/subject.constant";

const DUE_PATTERN = /^\d{4}-\d{2}(-\d{2})?$/;

const statusSchema = z.enum(STATUSES).catch("todo");
const pointsSchema = z.number().nonnegative().catch(0);

const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: statusSchema,
});

const blockSchema = z.object({
  id: z.string(),
  title: z.string(),
  required: pointsSchema,
  points: pointsSchema,
  status: statusSchema,
  due: z.string().regex(DUE_PATTERN).nullable().catch(null),
  items: z.array(itemSchema).default([]),
});

const attendanceSchema = z.object({
  max: pointsSchema,
  marks: z.array(z.enum(MARKS).nullable().catch(null)),
});

const subjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.enum(SUBJECT_KINDS).nullable().catch(null),
  attendance: attendanceSchema.nullable().catch(null),
  blocks: z.array(blockSchema),
  goal: z.literal(GRADES).optional().catch(undefined),
  planMode: z.enum(PLAN_MODE_KEYS).optional().catch(undefined),
});

export const subjectsSchema = z.array(subjectSchema);
