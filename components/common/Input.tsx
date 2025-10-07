import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "number";
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  className = "",
  label,
  error,
}) => {
  return (
    <div className="flex flex-col justify-start items-start gap-2 w-full">
      {label && (
        <label className="text-base font-medium text-foreground/80">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        autoComplete="off"
        className={`w-full px-4 py-2 bg-card border border-border rounded-md text-foreground placeholder-foreground/80 focus:outline-none focus:border-accent ${
          disabled ? "opacity-50 cursor-not-allowed bg-card" : ""
        } ${
          error ? "border-destructive focus:border-destructive" : ""
        } ${className}`}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default Input;
