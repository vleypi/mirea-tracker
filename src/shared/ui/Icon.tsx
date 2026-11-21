import { joinClassNames } from "@/shared/lib";
import { ICON_PATHS, type IconName } from "@/shared/ui/icons.constant";

interface IIconProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className }: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={joinClassNames("size-4 shrink-0", className)}
  >
    <path d={ICON_PATHS[name]} />
  </svg>
);
