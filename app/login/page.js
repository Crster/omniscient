"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  MdLockOutline,
  MdOutlineMail,
  MdOutlineVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useState } from "react";
import { Link } from "@nextui-org/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col mx-auto mt-36 w-96">
      <Image
        className="mx-auto"
        src="/logo.svg"
        alt="Omniscient Logo"
        width={157}
        height={157}
        priority
      />
      <h1 className="text-center font-semibold mt-5">Welcome Omniscient!</h1>

      <form className="flex flex-col gap-5 mt-10" action="/">
        <Input
          classNames={{
            label: "text-black",
            input: "text-black placeholder:text-gray-400",
          }}
          color="primary"
          labelPlacement="outside"
          label="Email"
          placeholder="Enter account email"
          startContent={<MdOutlineMail className="text-lg w-8 text-black" />}
        />

        <Input
          classNames={{
            label: "text-black",
            input: "text-black placeholder:text-gray-400",
          }}
          color="primary"
          labelPlacement="outside"
          label="Password"
          placeholder="Enter account password"
          type={showPassword ? "text" : "password"}
          startContent={<MdLockOutline className="text-lg w-8 text-black" />}
          endContent={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdOutlineVisibility className="text-lg w-8" />
              ) : (
                <MdVisibilityOff className="text-lg w-8" />
              )}
            </button>
          }
        />

        <Link href="/forgot-password" className="text-sm w-fit self-end">
          Forgot my Password?
        </Link>

        <Button
          className="rounded-lg bg-blue-700 py-3 mt-4 text-base text-white"
          type="submit"
        >
          Login Account
        </Button>
      </form>
    </div>
  );
}
