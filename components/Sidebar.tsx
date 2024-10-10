import { Link } from "@nextui-org/link";
import Image from "next/image";
import React from "react";
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
  MdOutlineAnnouncement,
} from "react-icons/md";
import { IconType } from "react-icons";
import { useRouter } from "next/router";

import useApiRequest from "./hook/useApiRequest";

export default function Sidebar() {
  const router = useRouter();
  const api = useApiRequest();

  const NavLink = (props: { href: string; icon: IconType; label: string }) => {
    return (
      <Link
        className={
          router.pathname.startsWith(props.href)
            ? "flex flex-1 px-4 py-3 gap-3 bg-blue-200 rounded-lg text-blue-800"
            : "flex flex-1 px-4 py-3 gap-3 text-black"
        }
        href={props.href}
      >
        {React.createElement(props.icon, { className: "text-blue-800 text-xl self-center" })}
        {props.label}
      </Link>
    );
  };

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-blue-50/[0.5]">
      <div className="flex flex-col h-full px-6 py-10">
        <div className="flex flex-row gap-1">
          <Image priority alt="Omniscient Logo" height={32} src="/logo.svg" width={32} />
          <h1 className="text-xl leading-8">Omniscient!</h1>
        </div>

        <div className="flex flex-1 flex-col my-8">
          <span className="text-gray-500 text-xl">Reports</span>

          <div className="flex flex-col mt-4">
            <NavLink href="/admin/dashboard" icon={MdOutlineBarChart} label="Dashboard" />
            <NavLink href="/admin/user" icon={MdOutlinePerson} label="User Role" />
            <NavLink href="/admin/voter" icon={MdOutlineHowToVote} label="Voters" />
            <NavLink href="/admin/heat-map" icon={MdOutlinePinDrop} label="Heat Map" />
            <NavLink href="/admin/candidate" icon={MdOutlineGroup} label="Candidates" />
            <NavLink href="/admin/death" icon={MdOutlineLocalFlorist} label="Death" />
            <NavLink href="/admin/announcement" icon={MdOutlineAnnouncement} label="Announcement" />
          </div>

          <div aria-hidden="true" className="mt-8 flex-1" />

          <div className="flex flex-col">
            <NavLink href="/admin/notification" icon={MdOutlineNotifications} label="Notification" />
            <NavLink href="/admin/setting" icon={MdOutlineSettings} label="Settings" />
          </div>
        </div>

        <div className="grid grid-flow-col justify-items-stretch bg-gray-200 rounded-lg py-6 px-3">
          <Image
            priority
            alt="User Image"
            className="rounded-full border-4 border-blue-600"
            height={48}
            src="https://ui-avatars.com/api/?format=png&name=John+Doe"
            width={48}
          />
          <div className="grid grid-rows-2">
            <span className="font-medium">Administrator</span>
            <span className="text-xs text-gray-500">Super Man</span>
          </div>
          <button className="justify-self-end" onClick={() => api("logout")}>
            <MdLogout className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
