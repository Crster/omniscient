"use client";

import { Link } from "@nextui-org/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MdOutlineBarChart,
  MdOutlinePerson,
  MdOutlineHowToVote,
  MdOutlinePinDrop,
  MdOutlineGroup,
  MdOutlineLocalFlorist,
  MdOutlineNotifications,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href) => {
    console.log(pathname)
    if (pathname === href) {
      return "flex flex-1 px-4 py-3 gap-3 bg-blue-200 rounded-lg text-blue-800"
    }

    return "flex flex-1 px-4 py-3 gap-3 text-black"
  }

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-blue-50/[0.5]">
      <div className="flex flex-col h-full px-6 py-10">
        <div className="flex flex-row gap-1">
          <Image
            src="/logo.svg"
            alt="Omniscient Logo"
            width={32}
            height={32}
            priority
          />
          <h1 className="text-xl leading-8">Omniscient!</h1>
        </div>

        <div className="flex flex-1 flex-col my-8">
          <span className="text-gray-500 text-xl">Reports</span>

          <div className="flex flex-col mt-4">
            <Link
              href="/dashboard"
              className={isActive("/dashboard")}
            >
              <MdOutlineBarChart className="text-blue-800 text-xl self-center" />
              Dashboard
            </Link>
            <Link
              href="/user"
              className={isActive("/user")}
            >
              <MdOutlinePerson className="text-blue-800 text-xl self-center" />
              User Role
            </Link>
            <Link
              href="/voter"
              className={isActive("/voter")}
            >
              <MdOutlineHowToVote className="text-blue-800 text-xl self-center" />
              Voters
            </Link>
            <Link
              href="/heat-map"
              className={isActive("/heat-map")}
            >
              <MdOutlinePinDrop className="text-blue-800 text-xl self-center" />
              Heat Map
            </Link>
            <Link
              href="/candidate"
              className={isActive("/candidate")}
            >
              <MdOutlineGroup className="text-blue-800 text-xl self-center" />
              Candidates
            </Link>
            <Link
              href="/death"
              className={isActive("/death")}
            >
              <MdOutlineLocalFlorist className="text-blue-800 text-xl self-center" />
              Death
            </Link>
          </div>

          <div aria-hidden="true" className="mt-8 flex-1"></div>

          <div className="flex flex-col">
            <Link
              href="/notification"
              className={isActive("/notification")}
            >
              <MdOutlineNotifications className="text-blue-800 text-xl self-center" />
              Notification
            </Link>
            <Link
              href="/setting"
              className={isActive("/setting")}
            >
              <MdOutlineSettings className="text-blue-800 text-xl self-center" />
              Settings
            </Link>
          </div>
        </div>

        <div className="grid grid-flow-col justify-items-stretch bg-gray-200 rounded-lg py-6 px-3">
          <Image
            className="rounded-full border-4 border-blue-600"
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="User Image"
            width={48}
            height={48}
            priority
          />
          <div className="grid grid-rows-2">
            <span className="font-medium">Administrator</span>
            <span className="text-xs text-gray-500">Super Man</span>
          </div>
          <button className="justify-self-end">
            <MdLogout className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
