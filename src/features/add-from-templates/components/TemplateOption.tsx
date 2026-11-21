import { joinClassNames, pluralize } from "@/shared/lib";
import { CheckMark } from "@/shared/ui";
import { type ISubject, KindBadge } from "@/entities/subject";
import { ADD_FROM_TEMPLATES_TEXT, BLOCK_FORMS } from "@/features/add-from-templates/constants/add-from-templates.constant";

interface ITemplateOptionProps {
  template: ISubject;
  added: boolean;
  selected: boolean;
  onToggle: () => void;
}

const describeBlocks = (count: number): string => (count ? `${count} ${pluralize(count, BLOCK_FORMS)}` : ADD_FROM_TEMPLATES_TEXT.noBlocks);

export const TemplateOption = ({ template, added, selected, onToggle }: ITemplateOptionProps) => (
  <li>
    <button
      type="button"
      disabled={added}
      aria-pressed={selected}
      onClick={onToggle}
      className={joinClassNames(
        "flex h-full w-full items-start gap-4 rounded-2xl p-5 text-left ring-2 transition",
        added ? "cursor-default bg-zinc-50 ring-transparent" : "bg-white shadow-sm hover:shadow-lg hover:shadow-zinc-900/5",
        selected ? "ring-zinc-900" : "ring-transparent",
      )}
    >
      <span className="mt-0.5">
        <CheckMark checked={selected || added} muted={added} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={joinClassNames("block leading-snug font-semibold", added && "text-zinc-500")}>{template.title}</span>
        <span className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          {template.kind && <KindBadge kind={template.kind} />}
          <span>{added ? ADD_FROM_TEMPLATES_TEXT.added : describeBlocks(template.blocks.length)}</span>
        </span>
      </span>
    </button>
  </li>
);
