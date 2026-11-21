import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { type ButtonSize, type ButtonVariant, getButtonClassName } from "@/shared/ui/button.constant";

interface IButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export const ButtonLink = ({ variant = "secondary", size = "md", ...props }: IButtonLinkProps) => (
  <Link className={getButtonClassName(variant, size)} {...props} />
);
