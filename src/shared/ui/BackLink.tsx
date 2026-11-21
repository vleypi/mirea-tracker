import Link from "next/link";
import { Icon } from "@/shared/ui/Icon";

interface IBackLinkProps {
  href: string;
  label: string;
}

export const BackLink = ({ href, label }: IBackLinkProps) => (
  <Link href={href} className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
    <Icon name="chevronLeft" />
    {label}
  </Link>
);
