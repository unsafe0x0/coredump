"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  image?: string;
  forwardRoute?: string;
}

const variantClasses = {
  primary:
    "bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-100",
  secondary:
    "bg-transparent border border-neutral-100 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800",
  tertiary: "bg-red-500 hover:bg-red-600 text-white border border-red-500",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  icon,
  label,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  image,
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
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer text-base font-normal ${variantClasses[variant]} ${className}`}
    >
      {image && <Image src={image} alt={""} width={20} height={20} />}
      {label && <span className="label">{label}</span>}
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
