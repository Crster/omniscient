"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

export function PrimaryInput({ label, placeholder, className, startContent }) {
  return (
    <Input
      className={className}
      classNames={{
        label: "text-black",
        input: "text-black placeholder:text-gray-400",
      }}
      color="primary"
      labelPlacement="outside"
      label={label}
      placeholder={placeholder}
      startContent={startContent}
    />
  );
}

export function PasswordInput({ label, placeholder, className, startContent }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
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
