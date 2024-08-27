"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

export function PrimaryInput({
  name,
  label,
  placeholder,
  className,
  startContent,
  value,
}) {
  return (
    <Input
      name={name}
      className={className}
      classNames={{
        label: "text-black",
        input: "text-black placeholder:text-gray-400",
      }}
      color="primary"
      labelPlacement="outside"
      label={label}
      value={value}
      placeholder={placeholder}
      startContent={startContent}
    />
  );
}

export function SecondaryInput({
  name,
  label,
  readOnly,
  placeholder,
  className,
  startContent,
  value,
}) {
  return (
    <Input
      name={name}
      classNames={{
        label: "text-gray-400 text-xl",
        input:
          "text-black placeholder:text-gray-400 text-xl focus-visible:bg-transparent focus-visible:border-b group-data-[hover=true]:border-b",
        inputWrapper: [
          "shadow-none bg-transparent p-0 group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent",
          className,
        ],
      }}
      color="primary"
      readOnly={readOnly}
      labelPlacement="outside"
      label={label}
      value={value}
      placeholder={placeholder}
      startContent={startContent}
    />
  );
}

export function PasswordInput({
  name,
  label,
  placeholder,
  className,
  startContent,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      name={name}
      className={className}
      classNames={{
        label: "text-black",
        input: "text-black placeholder:text-gray-400",
      }}
      color="primary"
      labelPlacement="outside"
      label={label}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      startContent={startContent}
      endContent={
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <MdOutlineVisibility className="text-lg w-8" />
          ) : (
            <MdOutlineVisibilityOff className="text-lg w-8" />
          )}
        </button>
      }
    />
  );
}
