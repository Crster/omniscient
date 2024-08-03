"use client";
import { useState } from "react";
import {
  MdLockOutline,
  MdVisibilityOff,
  MdOutlineVisibility,
} from "react-icons/md";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="password-input" className="font-normal text-sm">
        Password
      </label>
      <div className="flex bg-blue-100 rounded-lg px-2 py-3 items-center">
        <MdLockOutline className="text-lg w-8" />
        <input
          id="password-input"
          type={showPassword ? "text" : "password"}
          className="bg-blue-100 w-full focus:outline-none"
          placeholder="Enter account password"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <MdOutlineVisibility className="text-lg w-8" />
          ) : (
            <MdVisibilityOff className="text-lg w-8" />
          )}
        </button>
      </div>
    </div>
  );
}
