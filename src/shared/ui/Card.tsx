import type { ReactNode } from "react";

interface ICardProps {
  children: ReactNode;
}

export const Card = ({ children }: ICardProps) => <section className="rounded-3xl bg-white p-6 shadow-sm">{children}</section>;
