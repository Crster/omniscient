import Image from "next/image";
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
            <a
              href="/dashboard"
              className="flex flex-1 px-4 py-3 gap-3 bg-blue-200 rounded-lg text-blue-800"
            >
              <MdOutlineBarChart className="text-blue-800 text-xl self-center" />
              Dashboard
            </a>
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlinePerson className="text-blue-800 text-xl self-center" />
              User Role
            </a>
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlineHowToVote className="text-blue-800 text-xl self-center" />
              Voters
            </a>
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlinePinDrop className="text-blue-800 text-xl self-center" />
              Heat Map
            </a>
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlineGroup className="text-blue-800 text-xl self-center" />
              Candidates
            </a>
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlineLocalFlorist className="text-blue-800 text-xl self-center" />
              Death
            </a>
          </div>

          <div aria-hidden="true" className="mt-8 flex-1"></div>

          <div className="flex flex-col">
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlineNotifications className="text-blue-800 text-xl self-center" />
              Notification
            </a>
            <a href="/dashboard" className="flex flex-1 px-4 py-3 gap-3">
              <MdOutlineSettings className="text-blue-800 text-xl self-center" />
              Settings
            </a>
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
