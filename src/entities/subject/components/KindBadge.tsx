import { joinClassNames } from "@/shared/lib";
import type { SubjectKind } from "@/entities/subject/interfaces/subject.interface";

type KindBadgeTone = "light" | "dark";

interface IKindBadgeProps {
  kind: SubjectKind;
  tone?: KindBadgeTone;
}

const TONE_CLASS_NAMES: Record<KindBadgeTone, string> = {
  light: "bg-zinc-100 text-zinc-600",
  dark: "bg-white/10 text-zinc-300",
};

export const KindBadge = ({ kind, tone = "light" }: IKindBadgeProps) => (
  <span className={joinClassNames("shrink-0 self-start rounded-full px-3 py-1 text-xs font-medium", TONE_CLASS_NAMES[tone])}>{kind}</span>
);
