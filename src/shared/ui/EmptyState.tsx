import type { ReactNode } from "react";

interface IEmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: IEmptyStateProps) => (
  <div className="mt-16 flex flex-col items-center gap-2 text-center">
    <p className="text-lg font-semibold tracking-tight text-zinc-900">{title}</p>
    {description && <p className="text-zinc-500">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
