import { UNTITLED } from "@/entities/subject";

export const toTitle = (value: string): string => value.trim() || UNTITLED;
