import type { ButtonHTMLAttributes } from "react";
import { type ButtonSize, type ButtonVariant, getButtonClassName } from "@/shared/ui/button.constant";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({ variant = "secondary", size = "md", type = "button", ...props }: IButtonProps) => (
  <button type={type} className={getButtonClassName(variant, size)} {...props} />
);
