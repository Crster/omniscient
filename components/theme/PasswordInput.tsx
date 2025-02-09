import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { InputProps } from "@heroui/input";

import { PrimaryInput } from "./Input";

export default function PasswordInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PrimaryInput
      classNames={{
        label: "text-black",
        input: "text-black placeholder:text-gray-400",
      }}
      endContent={
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <MdOutlineVisibility className="text-lg w-8" />
          ) : (
            <MdOutlineVisibilityOff className="text-lg w-8" />
          )}
        </button>
      }
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
}
