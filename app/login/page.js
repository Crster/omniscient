"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { PrimaryButton } from "../../modules/components/theme/Button";
import { PrimaryInput } from "../../modules/components/theme/Input";
import login from "../../modules/actions/login";
import PasswordInput from "../../modules/components/theme/PasswordInput";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login(new FormData(e.target));
    if (res.success) {
      router.replace(res.data.redirect, true);
    } else {
      toast.error(res.error);
    }
  };

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

      <form className="flex flex-col gap-5 mt-10" onSubmit={handleLogin}>
        <PrimaryInput
          name="email"
          label="Email"
          placeholder="Enter account email"
          startContent={<MdOutlineMail className="text-lg w-8 text-black" />}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter account password"
          startContent={<MdLockOutline className="text-lg w-8 text-black" />}
        />

        <Link href="/forgot-password" className="text-sm w-fit self-end">
          Forgot my Password?
        </Link>

        <PrimaryButton className="py-3 mt-4" type="submit">
          Login Account
        </PrimaryButton>
      </form>
    </div>
  );
}
