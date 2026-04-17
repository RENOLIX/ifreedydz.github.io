import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonVariants(variant: ButtonVariant = "primary") {
  return cn(
    "ui-button",
    variant === "primary" && "ui-button-primary",
    variant === "secondary" && "ui-button-secondary",
    variant === "ghost" && "ui-button-ghost",
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants(variant), className)}
      {...props}
    />
  );
}
