import type { ReactNode } from "react";

interface ICardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  aside?: ReactNode;
}

export const CardHeader = ({ title, subtitle, aside }: ICardHeaderProps) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <div className="mt-1 text-sm text-zinc-500">{subtitle}</div>}
    </div>
    {aside}
  </div>
);
