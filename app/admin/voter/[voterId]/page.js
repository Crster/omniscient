"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import {
  PrimaryInput,
  SecondaryInput,
} from "../../../../modules/components/theme/Input";
import Image from "next/image";
import { Profile } from "../../../../modules/components/theme/Profile";

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

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <div className="grid grid-cols-2">
          <div className="flex flex-1 gap-5">
            <Image
              className="border-5 border-blue-500 rounded-full w-16 h-16"
              src="https://ui-avatars.com/api/?name=Kim+Ring"
              alt="User Image"
              width={64}
              height={64}
              priority
            />

            <div className="flex flex-col col-span-4 justify-center">
              <span className="font-medium text-xl">Rinko Kimaruu</span>
              <span className="text-gray-400 text-xl">#1 Supporter Voters</span>
            </div>
          </div>

          <div className="flex flex-1 gap-2 justify-end text-4xl self-center">
            <MdOutlineEdit className="text-blue-500" />
            <MdOutlineDelete className="text-gray-500" />
          </div>
        </div>

        <hr />

        <SecondaryInput
          className="mt-5"
          label={"Purok / Subdivs"}
          value={"Ubalde"}
        />

        <SecondaryInput
          className="mt-5"
          label={"Barangay"}
          value={"Ubalde Ubalde"}
        />

        <SecondaryInput
          className="mt-5"
          label={"Phone Number"}
          value={"985 1234 1234"}
          startContent={
            <Image
              src="/ph-phone.svg"
              alt="Philippines Phone Number"
              width={76}
              height={25}
            />
          }
        />

        <span className="mt-5 text-gray-400 text-xl">Candidates</span>
        <div className="flex flex-col">
          <Profile
            src="https://ui-avatars.com/api/?name=Cameron+Williamson"
            alt="Cameron Williamson Image"
            name="Cameron Williamson"
            title="Barangay Captain"
          />
        </div>

        <hr/>

        <span className="mt-5 text-gray-400 text-xl">Family Number</span>
        <div className="flex flex-row gap-5">
          <span className="text-black text-base">1 Black, Marvin</span>
          <span className="text-black text-base">2 Cooper, Kristin</span>
          <span className="text-black text-base">3 Henry, Arthur</span>
          <span className="text-black text-base">4 Miles, Esther</span>
        </div>
      </div>
    </>
  );
}
