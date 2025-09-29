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
        <label className="text-base font-medium text-neutral-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
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
        className={`w-full px-4 py-2 border border-[#2a2a2a] rounded-md bg-[#222222] text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-100 ${disabled ? "opacity-50 cursor-not-allowed bg-[#222222]" : ""} ${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
      />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
};

export default Input;
