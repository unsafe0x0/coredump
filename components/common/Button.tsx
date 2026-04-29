"use client";
import { useRouter } from "next/navigation";
import type React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  forwardRoute?: string;
}

const variantClasses = {
  primary:
    "bg-foreground text-background border border-foreground hover:bg-foreground/90",
  secondary: "bg-background border border-border text-foreground hover:bg-card",
  tertiary:
    "bg-destructive hover:bg-destructive-hover text-accent-text border border-destructive",
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  className = "",
  forwardRoute,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (forwardRoute) {
      router.push(forwardRoute);
    }
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-base font-normal transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
