"use client";

import { useToday } from "@/shared/lib";
import type { IResolvedSubject } from "@/entities/subject/interfaces/subject.interface";
import { useSubjects } from "@/entities/subject/hooks/useSubjects";
import { resolveSubject } from "@/entities/subject/utils/resolve-subject.util";

export const useResolvedSubjects = (): IResolvedSubject[] | null => {
  const subjects = useSubjects();
  const today = useToday();
  return subjects && subjects.map((subject) => resolveSubject(subject, today));
};
