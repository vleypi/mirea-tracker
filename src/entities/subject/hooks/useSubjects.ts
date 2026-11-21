"use client";

import { useSyncExternalStore } from "react";
import type { ISubject } from "@/entities/subject/interfaces/subject.interface";
import { subjectStore } from "@/entities/subject/services/subject-store.service";

export const useSubjects = (): ISubject[] | null =>
  useSyncExternalStore(subjectStore.subscribe, subjectStore.getSnapshot, subjectStore.getServerSnapshot);
