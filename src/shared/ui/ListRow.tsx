import type { ReactNode } from "react";

interface IListRowProps {
  children: ReactNode;
}

export const ListRow = ({ children }: IListRowProps) => (
  <li className="flex flex-col gap-3 rounded-2xl bg-zinc-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">{children}</li>
);
