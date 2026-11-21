import type { ReactNode } from "react";

interface IFieldProps {
  label: string;
  children: ReactNode;
}

export const Field = ({ label, children }: IFieldProps) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-medium text-zinc-500">{label}</span>
    {children}
  </label>
);
