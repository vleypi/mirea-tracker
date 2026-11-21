import { joinClassNames } from "@/shared/lib";
import { Icon } from "@/shared/ui/Icon";
import type { IconName } from "@/shared/ui/icons.constant";

type IconButtonVariant = "stepper" | "danger";

interface IIconButtonProps {
  icon: IconName;
  label: string;
  onClick: () => void;
  variant?: IconButtonVariant;
}

const VARIANT_CLASS_NAMES: Record<IconButtonVariant, string> = {
  stepper: "size-8 rounded-full text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm",
  danger: "size-10 rounded-xl text-zinc-400 hover:bg-rose-50 hover:text-rose-600",
};

export const IconButton = ({ icon, label, onClick, variant = "stepper" }: IIconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className={joinClassNames("grid shrink-0 place-items-center transition", VARIANT_CLASS_NAMES[variant])}
  >
    <Icon name={icon} />
  </button>
);
