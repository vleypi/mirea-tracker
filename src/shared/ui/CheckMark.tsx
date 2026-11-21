import { joinClassNames } from "@/shared/lib";
import { Icon } from "@/shared/ui/Icon";

interface ICheckMarkProps {
  checked: boolean;
  muted?: boolean;
}

export const CheckMark = ({ checked, muted = false }: ICheckMarkProps) => (
  <span
    aria-hidden="true"
    className={joinClassNames(
      "grid size-5 shrink-0 place-items-center rounded-md border-2 transition",
      checked ? (muted ? "border-zinc-300 bg-zinc-300 text-white" : "border-zinc-900 bg-zinc-900 text-white") : "border-zinc-300 bg-white",
    )}
  >
    {checked && <Icon name="check" className="size-3.5" />}
  </span>
);
