"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { Profile } from "../../../../modules/components/theme/Profile";
import { SecondaryInput } from "../../../../modules/components/theme/Input";
import {
  IconButton,
  PrimaryButton,
} from "../../../../modules/components/theme/Button";

const defaultState = {
  precinctNo: "",
  name: {
    firstName: "",
    middleName: "",
    lastName: "",
  },
  address: {
    houseNo: "",
    street: "",
    subdivision: "",
    barangay: "",
    city: "",
    state: "",
    zipcode: "",
  },
  phone: "",
  family: [],
};

export default function VoterDetailPage() {
  const params = useParams();
  const [voter, setVoter] = useState(defaultState);

  return (
    <>
      <div className="flex flex-row gap-3 text-4xl font-medium">
        <Link href="./">Voter List</Link>
        <span className="text-gray-500">/</span>
        <span className="text-blue-500">Profiling</span>
      </div>

      <h2 className="text-3xl text-blue-500">{params.voterId}</h2>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          className="mt-5"
          label="First Name"
          value={voter.name.firstName}
        />
        <SecondaryInput
          className="mt-5"
          label="Middle Name"
          value={voter.name.middleName}
        />
        <SecondaryInput
          className="mt-5"
          label="Last Name"
          value={voter.name.lastName}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          className="mt-5"
          label="House #"
          value={voter.address.houseNo}
        />

        <SecondaryInput
          className="mt-5"
          label="Street"
          value={voter.address.street}
        />

        <SecondaryInput
          className="mt-5"
          label="Purok/Subdivision"
          value={voter.address.subdivision}
        />

        <SecondaryInput
          className="mt-5"
          label="Barangay"
          value={voter.address.barangay}
        />

        <SecondaryInput
          className="mt-5"
          label="City"
          value={voter.address.city}
        />

        <SecondaryInput
          className="mt-5"
          label="Province"
          value={voter.address.state}
        />

        <SecondaryInput
          className="mt-5"
          label="Zip Code"
          value={voter.address.zipcode}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          className="mt-5"
          label="Mobile"
          value={voter.phone}
          startContent={
            <Image
              src="/ph-phone.svg"
              alt="Philippines Phone Number"
              width={76}
              height={25}
            />
          }
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <span className="mt-5 text-gray-400 text-xl">Family Number</span>
        <div className="flex flex-row gap-5">
          {voter.family.forEach((member) => {
            return (
              <span className="text-black text-base">
                {member.name} - {member.relation}
              </span>
            );
          })}

          <IconButton
            size="small"
            icon={<MdOutlineAdd className="text-2xl" />}
            label="Add Family Member"
          />
        </div>
      </div>
    </>
  );
}
