import { joinClassNames } from "@/shared/lib";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "tile" | "inverse";
export type ButtonSize = "md" | "lg";

const BASE_CLASS_NAME = "inline-flex items-center justify-center gap-2 font-medium transition disabled:pointer-events-none disabled:opacity-40";

const VARIANT_CLASS_NAMES: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white shadow-sm hover:bg-zinc-700",
  secondary: "bg-white text-zinc-700 shadow-sm hover:text-zinc-900 hover:shadow-lg hover:shadow-zinc-900/5",
  ghost: "text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm",
  danger: "text-rose-600 hover:bg-rose-50",
  tile: "w-full bg-zinc-200/60 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900",
  inverse: "bg-white text-zinc-900 hover:bg-zinc-100",
};

const SIZE_CLASS_NAMES: Record<ButtonSize, string> = {
  md: "rounded-full px-5 py-2.5 text-sm",
  lg: "rounded-2xl px-6 py-4 text-base",
};

const TILE_SIZE_CLASS_NAME = "rounded-3xl py-5 text-sm";

export const getButtonClassName = (variant: ButtonVariant, size: ButtonSize): string =>
  joinClassNames(BASE_CLASS_NAME, VARIANT_CLASS_NAMES[variant], variant === "tile" ? TILE_SIZE_CLASS_NAME : SIZE_CLASS_NAMES[size]);
