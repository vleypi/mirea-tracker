import type { ReactNode } from "react";
import { joinClassNames } from "@/shared/lib";

type PageWidth = "wide" | "narrow";

interface IPageShellProps {
  width?: PageWidth;
  children: ReactNode;
}

const WIDTH_CLASS_NAMES: Record<PageWidth, string> = {
  wide: "max-w-5xl",
  narrow: "max-w-3xl",
};

export const PageShell = ({ width = "narrow", children }: IPageShellProps) => (
  <main className={joinClassNames("mx-auto px-4 py-10 sm:px-6 sm:py-16", WIDTH_CLASS_NAMES[width])}>{children}</main>
);
