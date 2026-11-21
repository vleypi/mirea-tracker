import { joinClassNames } from "@/shared/lib";

export interface ISegmentedOption<Value extends string | number> {
  value: Value;
  label: string;
  title?: string;
  activeClassName?: string;
}

type SegmentedSize = "text" | "icon";

interface ISegmentedProps<Value extends string | number> {
  options: readonly ISegmentedOption<Value>[];
  value: Value | null;
  onChange: (value: Value) => void;
  size?: SegmentedSize;
  wrap?: boolean;
}

const DEFAULT_ACTIVE_CLASS_NAME = "bg-white text-zinc-900 shadow-sm";

const SIZE_CLASS_NAMES: Record<SegmentedSize, string> = {
  text: "px-3 py-1.5 text-xs font-medium",
  icon: "grid size-8 place-items-center text-sm font-semibold",
};

export const Segmented = <Value extends string | number>({ options, value, onChange, size = "text", wrap = false }: ISegmentedProps<Value>) => (
  <div className={joinClassNames("bg-zinc-100 p-1", wrap ? "flex flex-wrap gap-1 rounded-2xl" : "inline-flex shrink-0 rounded-full")}>
    {options.map((option) => {
      const pressed = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={pressed}
          aria-label={option.title}
          title={option.title}
          onClick={() => onChange(option.value)}
          className={joinClassNames(
            "rounded-full transition",
            SIZE_CLASS_NAMES[size],
            pressed ? (option.activeClassName ?? DEFAULT_ACTIVE_CLASS_NAME) : "text-zinc-500 hover:text-zinc-900",
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
