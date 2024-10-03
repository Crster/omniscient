"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";
import { CalendarDate, parseDate } from "@internationalized/date";
import { MdOutlineAdd } from "react-icons/md";
import {
  SecondaryDateInput,
  SecondaryInput,
} from "../../../../modules/components/theme/Input";
import {
  IconButton,
  PrimaryButton,
} from "../../../../modules/components/theme/Button";
import {
  RadioSelect,
  Select,
} from "../../../../modules/components/theme/Select";
import { familyRelation } from "../../../../modules/models/family-relation";
import { civilStatus } from "../../../../modules/models/civil-status";
import { gender } from "../../../../modules/models/gender";
import { flatten, unflatten } from "flat";

const defaultState = {
  name: {
    firstName: "",
    middleName: "",
    lastName: "",
  },
  address: {
    houseNo: "",
    street: "",
    purok: "",
    barangay: "",
    city: "",
    province: "",
    zipcode: "",
  },
  mobileNo: "",
  email: "",
  precinctNo: "",
  gender: "male",
  birthDate: new Date("2000-01-01"),
  placeOfBirth: {
    barangay: "",
    city: "",
    province: "",
  },
  civilStatus: "single",
  citizenship: "filipino",
  occupation: "",
  tin: "",
  socialGroup: new Set([]),
  family: [],
};

export default function VoterDetailPage() {
  const params = useParams();
  const [voter, setVoter] = useState(defaultState);

  const handleValueChange = (property) => {
    return (value) => {
      const tmpData = flatten(voter);
      tmpData[property] = value;

      const newData = unflatten(tmpData);
      setVoter(newData);
    };
  };

  const handleSocialGroupChange = (property) => {
    return (value) => {
      const tmpData = { ...voter };

      if (value) {
        tmpData.socialGroup.add(property);
      } else {
        tmpData.socialGroup.delete(property);
      }

      setVoter(tmpData);
    };
  };

  const handleAddFamily = () => {
    const tmpData = { ...voter };
    tmpData.family.push({ name: "", relation: "" });

    setVoter(tmpData);
  };

  const handleSave = async () => {
    //const response = await add
  }

  return (
    <>
      <div className="flex flex-row gap-3 text-4xl font-medium">
        <Link href="./">Voter List</Link>
        <span className="text-gray-500">/</span>
        <span className="text-blue-500">Profiling</span>
      </div>

      <div className="grid grid-cols-2">
        <h2 className="text-3xl text-blue-500">{params.voterId}</h2>
        <PrimaryButton outline className="px-2 py-2 w-32 place-self-end" onPress={handleSave}>
          Save
        </PrimaryButton>
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          label="First Name"
          value={voter.name.firstName}
          onValueChange={handleValueChange("name.firstName")}
        />
        <SecondaryInput
          label="Middle Name"
          value={voter.name.middleName}
          onValueChange={handleValueChange("name.middleName")}
        />
        <SecondaryInput
          label="Last Name"
          value={voter.name.lastName}
          onValueChange={handleValueChange("name.lastName")}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          label="House #"
          value={voter.address.houseNo}
          onValueChange={handleValueChange("address.houseNo")}
        />
        <SecondaryInput
          label="Street"
          value={voter.address.street}
          onValueChange={handleValueChange("address.street")}
        />
        <SecondaryInput
          label="Purok/Subdivision"
          value={voter.address.purok}
          onValueChange={handleValueChange("address.purok")}
        />
        <SecondaryInput
          label="Barangay"
          value={voter.address.barangay}
          onValueChange={handleValueChange("address.barangay")}
        />
        <SecondaryInput
          label="City"
          value={voter.address.city}
          onValueChange={handleValueChange("address.city")}
        />
        <SecondaryInput
          label="Province"
          value={voter.address.province}
          onValueChange={handleValueChange("address.province")}
        />
        <SecondaryInput
          label="Zip Code"
          value={voter.address.zipcode}
          onValueChange={handleValueChange("address.zipcode")}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          label="Mobile"
          value={voter.mobileNo}
          onValueChange={handleValueChange("mobileNo")}
          startContent={
            <Image
              src="/ph-phone.svg"
              alt="Philippines Phone Number"
              width={76}
              height={25}
            />
          }
        />

        <SecondaryInput
          label="Email"
          value={voter.email}
          onValueChange={handleValueChange("email")}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          label="Precinct No"
          value={voter.precinctNo}
          onValueChange={handleValueChange("precinctNo")}
        />
        <SecondaryInput
          label="Occupation"
          value={voter.occupation}
          onValueChange={handleValueChange("occupation")}
        />
        <SecondaryInput
          label="TIN"
          value={voter.tin}
          onValueChange={handleValueChange("tin")}
        />
        <RadioSelect
          label="Gender"
          items={gender}
          value={voter.gender}
          onValueChange={handleValueChange("gender")}
        />
        <SecondaryDateInput
          label="Date of Birth"
          value={
            new CalendarDate(
              voter.birthDate.getFullYear(),
              voter.birthDate.getMonth() + 1,
              voter.birthDate.getDate()
            )
          }
          onChange={(val) => handleValueChange("birthDate")(val.toDate())}
        />

        <div className="grid grid-cols-3 gap-4 mt-5">
          <SecondaryInput
            label="Place of Birth"
            placeholder="Enter Barangay"
            value={voter.placeOfBirth.barangay}
            onValueChange={handleValueChange("placeOfBirth.barangay")}
          />
          <SecondaryInput
            label=" "
            placeholder="Enter City"
            value={voter.placeOfBirth.city}
            onValueChange={handleValueChange("placeOfBirth.city")}
          />
          <SecondaryInput
            label=" "
            placeholder="Enter Province"
            value={voter.placeOfBirth.province}
            onValueChange={handleValueChange("placeOfBirth.province")}
          />
        </div>

        <RadioSelect
          className="text-xl text-gray-400 mb-5"
          label="Civil Status"
          items={civilStatus}
          value={voter.civilStatus}
          onValueChange={handleValueChange("civilStatus")}
        />

        <SecondaryInput
          label="Citizenship"
          value={voter.citizenship}
          onValueChange={handleValueChange("citizenship")}
        />

        <Checkbox
          isSelected={voter.socialGroup.has("illiterate")}
          onValueChange={handleSocialGroupChange("illiterate")}
        >
          Illiterate
        </Checkbox>
        <Checkbox
          isSelected={voter.socialGroup.has("indigenous")}
          onValueChange={handleSocialGroupChange("indigenous")}
        >
          Indigenous People
        </Checkbox>
        <Checkbox
          isSelected={voter.socialGroup.has("pwd")}
          onValueChange={handleSocialGroupChange("pwd")}
        >
          Person with Disability
        </Checkbox>
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <span className="mt-5 text-gray-500 text-xl">Family Number</span>
        <div className="flex flex-col gap-5">
          {voter.family.map((member, index) => {
            return (
              <div className="grid grid-cols-2 gap-4">
                <SecondaryInput
                  label="Name"
                  value={member.name}
                  onValueChange={handleValueChange(`family.${index}.name`)}
                />
                <Select
                  label="Relation"
                  placeholder="Relation"
                  classNames={{
                    label: "text-xl text-gray-500",
                    value: "text-xl text-black",
                  }}
                  items={familyRelation}
                  selectedKeys={member.relation}
                  onSelectionChange={handleValueChange(
                    `family.${index}.relation`
                  )}
                />
              </div>
            );
          })}

          <IconButton
            size="small"
            icon={<MdOutlineAdd className="text-2xl" />}
            label="Add Family Member"
            onPress={handleAddFamily}
          />
        </div>
      </div>
    </>
  );
}
