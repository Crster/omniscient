import Image from "next/image";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { Link } from "@nextui-org/link";
import { PrimaryButton } from "../../components/theme/Button";
import { PasswordInput, PrimaryInput } from "../../components/theme/Input";

export default function LoginPage() {
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
        <PrimaryInput
          label="Email"
          placeholder="Enter account email"
          startContent={<MdOutlineMail className="text-lg w-8 text-black" />}
        />
        <PasswordInput
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
