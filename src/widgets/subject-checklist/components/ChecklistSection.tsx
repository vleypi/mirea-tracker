import Link from "next/link";
import { ROUTES } from "@/shared/config";
import { joinClassNames } from "@/shared/lib";
import { DueLabel, type IResolvedSubject, StatusMark } from "@/entities/subject";
import { SUBJECT_CHECKLIST_TEXT } from "@/widgets/subject-checklist/constants/subject-checklist.constant";

interface IChecklistSectionProps {
  subject: IResolvedSubject;
}

export const ChecklistSection = ({ subject: { id, title, blocks } }: IChecklistSectionProps) => (
  <section>
    <h2 className="mb-2 px-1 text-sm font-semibold">
      <Link href={ROUTES.subject(id)} className="transition hover:text-zinc-500">
        {title}
      </Link>
      <span className="font-normal text-zinc-500 tabular-nums">
        {` · ${blocks.filter((block) => block.status === "done").length} ${SUBJECT_CHECKLIST_TEXT.of} ${blocks.length}`}
      </span>
    </h2>
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl bg-white shadow-sm">
      {blocks.map((block) => (
        <li key={block.id} className="flex items-center gap-3 px-4 py-3">
          <StatusMark status={block.status} />
          <span className={joinClassNames("flex-1 text-sm font-medium", block.status === "done" && "text-zinc-400 line-through")}>{block.title}</span>
          <DueLabel block={block} />
        </li>
      ))}
    </ul>
  </section>
);
