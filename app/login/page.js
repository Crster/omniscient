import Image from "next/image";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";

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
        <EmailInput/>
        <PasswordInput/>

        <a
          href="/forgot-password"
          className="text-sm w-fit self-end text-blue-600"
        >
          Forgot my Password?
        </a>

        <button
          className="rounded-lg bg-blue-700 py-3 mt-4 text-base text-white"
          type="submit"
        >
          Login Account
        </button>
      </form>
    </div>
  );
}
