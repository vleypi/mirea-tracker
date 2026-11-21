import type { ISubject } from "@/entities/subject/interfaces/subject.interface";
import { subjectsSchema } from "@/entities/subject/schemas/subjects.schema";

export const parseSubjects = (value: unknown): ISubject[] | null => {
  const result = subjectsSchema.safeParse(value);
  return result.success ? result.data : null;
};
