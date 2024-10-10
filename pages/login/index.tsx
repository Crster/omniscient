import Image from "next/image";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/link";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { useState } from "react";

import { PrimaryButton } from "@/components/theme/Button";
import { PrimaryInput } from "@/components/theme/Input";
import PasswordInput from "@/components/theme/PasswordInput";
import useApiRequest from "@/components/hook/useApiRequest";

const defaultState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const api = useApiRequest();
  const [credential, setCredential] = useState(defaultState);

  const handleLogin = async () => {
    const result = await api("login", credential);

    if (!result.success) {
      toast.error(result.error as string);
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-36 w-96">
      <Image priority alt="Omniscient Logo" className="mx-auto" height={157} src="/logo.svg" width={157} />
      <h1 className="text-center font-semibold mt-5">Welcome Omniscient!</h1>

      <div className="flex flex-col gap-5 mt-10">
        <PrimaryInput
          label="Email"
          placeholder="Enter account email"
          startContent={<MdOutlineMail className="text-lg w-8 text-black" />}
          value={credential.email}
          onValueChange={(e) => setCredential({ ...credential, email: e })}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter account password"
          startContent={<MdLockOutline className="text-lg w-8 text-black" />}
          value={credential.password}
          onValueChange={(e) => setCredential({ ...credential, password: e })}
        />

        <Link className="text-sm w-fit self-end" href="/forgot-password">
          Forgot my Password?
        </Link>

        <PrimaryButton className="py-3 mt-4" onPress={handleLogin}>
          Login Account
        </PrimaryButton>
      </div>
    </div>
  );
}
