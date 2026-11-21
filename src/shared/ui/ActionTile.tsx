import Link from "next/link";
import { joinClassNames } from "@/shared/lib";
import { INTERACTIVE_CARD_CLASS_NAME } from "@/shared/ui/card.constant";
import { Icon } from "@/shared/ui/Icon";
import type { IconName } from "@/shared/ui/icons.constant";

interface IActionTileContentProps {
  icon: IconName;
  title: string;
  description: string;
  emphasized?: boolean;
}

type IActionTileProps = IActionTileContentProps & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

const getTileClassName = (emphasized: boolean): string =>
  joinClassNames("group", INTERACTIVE_CARD_CLASS_NAME, emphasized ? "bg-zinc-900 text-white" : "bg-white text-zinc-900");

const ActionTileContent = ({ icon, title, description, emphasized = false }: IActionTileContentProps) => (
  <>
    <span className="flex items-start justify-between gap-4">
      <span className={joinClassNames("grid size-12 place-items-center rounded-2xl", emphasized ? "bg-white/10" : "bg-zinc-100 text-zinc-600")}>
        <Icon name={icon} className="size-5" />
      </span>
      <Icon
        name="arrowRight"
        className={joinClassNames("size-5 transition group-hover:translate-x-0.5", emphasized ? "text-zinc-500 group-hover:text-white" : "text-zinc-300 group-hover:text-zinc-900")}
      />
    </span>
    <span className="mt-auto block pt-10">
      <span className="block text-lg leading-snug font-semibold">{title}</span>
      <span className={joinClassNames("mt-1 block text-sm", emphasized ? "text-zinc-400" : "text-zinc-500")}>{description}</span>
    </span>
  </>
);

export const ActionTile = ({ href, onClick, ...content }: IActionTileProps) => {
  const className = getTileClassName(content.emphasized ?? false);
  return href ? (
    <Link href={href} className={className}>
      <ActionTileContent {...content} />
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      <ActionTileContent {...content} />
    </button>
  );
};
