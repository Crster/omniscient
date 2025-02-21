import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col mx-auto mt-36 w-96">
      <Image priority alt="Welcome image" className="mx-auto" height={324} src="/welcome.svg" width={438} />

      <h1 className="font-semibold text-xl mt-5">Welcome to Survey Omniscient!</h1>

      <p className="text-justify text-sm text-gray-500 my-5">
        The Political Survey App with Profiling is a valuable tool for any political campaign. By using the app, you can
        collect data that will help you to target your campaign more effectively and win more votes.
      </p>

      <Button as={Link} className="py-3 mt-4" href="/admin/dashboard">
        Continue to Dashboard
      </Button>
    </div>
  );
}
