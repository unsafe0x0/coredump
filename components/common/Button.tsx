"use client";
import React from "react";
import { useRouter } from "next/navigation";

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
    "bg-accent hover:bg-accent-hover text-accent-text border border-accent",
  secondary:
    "bg-transparent border border-accent text-accent hover:bg-accent hover:text-accent-text",
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
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-base font-normal transition-colors duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
