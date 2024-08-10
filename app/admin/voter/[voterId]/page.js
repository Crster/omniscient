"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function VoterDetailPage() {
  const params = useParams();

  return (
    <>
      <div className="flex flex-row gap-3 text-4xl font-medium">
        <Link href="./">Voter List</Link>
        <span className="text-gray-500">/</span>
        <span className="text-blue-500">Profiling</span>
      </div>

      <h2 className="text-3xl text-blue-500">{params.voterId}</h2>

      <div className="bg-blue-400/5 px-5 py-5">
        <div className="grid grid-cols-6">
          <div className="border-5 border-blue-500 rounded-full w-16 h-16 text-center content-center text-2xl font-bold">
            RK
          </div>

          <div className="flex flex-col col-span-4">
            <span>Rinko Kimaruu</span>
            <span>#1 Supporter Voters</span>
          </div>

          <div className="flex flex-1 gap-2 justify-end text-4xl">
            <MdOutlineEdit className="text-blue-500" />
            <MdOutlineDelete className="text-gray-500" />
          </div>
        </div>
      </div>
    </>
  );
}
