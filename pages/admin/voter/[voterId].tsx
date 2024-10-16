import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { getLocalTimeZone } from "@internationalized/date";
import { MdOutlineAdd, MdOutlineSave } from "react-icons/md";
import { flatten, unflatten } from "flat";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { SecondaryDateInput, SecondaryInput } from "@/components/theme/Input";
import { IconButton, PrimaryButton } from "@/components/theme/Button";
import { RadioSelect, SecondarySelection } from "@/components/theme/Selection";
import useApiRequest from "@/components/hook/useApiRequest";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { ApiResponse } from "@/libraries/ApiHandler";
import { toCalendar } from "@/libraries/Generator";
import { Voter } from "@/models/Voter";
import { Gender } from "@/models/Gender";
import { CivilStatus } from "@/models/CivilStatus";
import { FamilyRelation } from "@/models/FamilyRelation";

const defaultState: Voter = {
  name: {
    firstName: "",
    middleName: "",
    lastName: "",
  },
  address: {
    barangay: "",
    city: "",
    province: "",
    purok: "",
    country: "",
    houseNo: "",
    street: "",
    zipCode: "",
  },
  mobileNo: "",
  email: "",
  precinctNo: "",
  gender: Gender.Male,
  birthDate: new Date(2000, 0, 1),
  placeOfBirth: {
    barangay: "",
    city: "",
    province: "",
  },
  civilStatus: CivilStatus.Single,
  citizenship: "filipino",
  occupation: "",
  tin: "",
  socialGroup: [],
  family: [],
};

export default function VoterDetailPage() {
  const router = useRouter();
  const api = useApiRequest();
  const [voter, setVoter] = useState(defaultState);
  const [error, setError] = useState<Record<string, any>>({});

  useEffect(() => {
    if (router.query.voterId) {
      api<Voter>("get-voter", router.query.voterId).then((result) => {
        if (result.success && result.data) {
          setVoter(result.data);
        } else {
          toast.error(result.error as string);
        }
      });
    }
  }, [router.query.voterId]);

  const handleValueChange = (property: string) => {
    return (value: any) => {
      const tmpData: Record<string, any> = flatten(voter);

      tmpData[property] = value;

      const newData: typeof defaultState = unflatten(tmpData);

      setVoter(newData);
    };
  };

  const handleSocialGroupChange = (property: string) => {
    return (value: any) => {
      const tmpData: typeof defaultState = { ...voter };

      if (value) {
        tmpData.socialGroup = [...(tmpData.socialGroup ?? []), value];
      } else {
        tmpData.socialGroup = tmpData.socialGroup?.filter((e) => e !== property);
      }

      setVoter(tmpData);
    };
  };

  const handleAddFamily = () => {
    const tmpData: typeof defaultState = { ...voter };

    tmpData.family?.push({ name: "", relation: FamilyRelation.Parent });

    setVoter(tmpData);
  };

  const handleSave = async () => {
    let response: ApiResponse;

    if (router.query.voterId === "new-voter") {
      response = await api("add-voter", voter);
    } else {
      response = await api("edit-voter", router.query.voterId, voter);
    }

    if (response.success) {
      const voterId = response.data as string;

      toast.success("Successfully save voter " + voter.name.lastName);
      router.replace(`/admin/voter/${voterId}`);
    } else if (response.error) {
      toast.error(response.error);

      if (response.data?.errorCode === "ValidationError") {
        const errRet = new Map<string, any>();

        for (const errField of response.data?.reason) {
          errRet.set(errField.path.join("."), {
            isInvalid: true,
            errorMessage: errField.message,
          });
        }

        setError(Object.fromEntries(errRet));
      }
    }
  };

  return (
    <>
      <div className="flex flex-row gap-3 text-4xl font-medium">
        <Link href="./">Voter List</Link>
        <span className="text-gray-500">/</span>
        <span className="text-blue-500">Profiling</span>
      </div>

      <div className="grid grid-cols-2">
        <h2 className="text-3xl text-blue-500">{router.query.voterId}</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 place-self-end"
          startContent={<MdOutlineSave className="inline text-2xl align-top" />}
          onPress={handleSave}
        >
          Save
        </PrimaryButton>
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          isRequired
          label="First Name"
          value={voter.name.firstName}
          onValueChange={handleValueChange("name.firstName")}
          {...error?.["name.firstName"]}
        />
        <SecondaryInput
          label="Middle Name"
          value={voter.name.middleName}
          onValueChange={handleValueChange("name.middleName")}
          {...error?.["name.middleName"]}
        />
        <SecondaryInput
          isRequired
          label="Last Name"
          value={voter.name.lastName}
          onValueChange={handleValueChange("name.lastName")}
          {...error?.["name.lastName"]}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          label="House #"
          value={voter.address.houseNo}
          onValueChange={handleValueChange("address.houseNo")}
          {...error?.["address.houseNo"]}
        />
        <SecondaryInput
          label="Street"
          value={voter.address.street}
          onValueChange={handleValueChange("address.street")}
          {...error?.["address.street"]}
        />
        <SecondaryInput
          isRequired
          label="Purok/Subdivision"
          value={voter.address.purok}
          onValueChange={handleValueChange("address.purok")}
          {...error?.["address.purok"]}
        />
        <SecondaryInput
          isRequired
          label="Barangay"
          value={voter.address.barangay}
          onValueChange={handleValueChange("address.barangay")}
          {...error?.["address.barangay"]}
        />
        <SecondaryInput
          isRequired
          label="City"
          value={voter.address.city}
          onValueChange={handleValueChange("address.city")}
          {...error?.["address.city"]}
        />
        <SecondaryInput
          isRequired
          label="Province"
          value={voter.address.province}
          onValueChange={handleValueChange("address.province")}
          {...error?.["address.province"]}
        />
        <SecondaryInput
          label="Zip Code"
          value={voter.address.zipCode}
          onValueChange={handleValueChange("address.zipCode")}
          {...error?.["address.zipCode"]}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          label="Mobile"
          startContent={<Image alt="Philippines Phone Number" height={25} src="/ph-phone.svg" width={76} />}
          value={voter.mobileNo}
          onValueChange={handleValueChange("mobileNo")}
          {...error?.["mobileNo"]}
        />

        <SecondaryInput
          label="Email"
          value={voter.email}
          onValueChange={handleValueChange("email")}
          {...error?.["email"]}
        />
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          isRequired
          label="Precinct No"
          value={voter.precinctNo}
          onValueChange={handleValueChange("precinctNo")}
          {...error?.["precinctNo"]}
        />
        <SecondaryInput
          label="Occupation"
          value={voter.occupation}
          onValueChange={handleValueChange("occupation")}
          {...error?.["occupation"]}
        />
        <SecondaryInput label="TIN" value={voter.tin} onValueChange={handleValueChange("tin")} {...error?.["tin"]} />
        <RadioSelect
          items={enumToKeyLabel(Gender)}
          label="Gender"
          value={voter.gender}
          onValueChange={handleValueChange("gender")}
          {...error?.["gender"]}
        />
        <SecondaryDateInput
          label="Date of Birth"
          value={toCalendar(voter.birthDate)}
          onChange={(val) => handleValueChange("birthDate")(val.toDate(getLocalTimeZone()))}
          {...error?.["birthDate"]}
        />

        <div className="grid grid-cols-3 gap-4 mt-5">
          <SecondaryInput
            label="Place of Birth"
            placeholder="Enter Barangay"
            value={voter.placeOfBirth?.barangay}
            onValueChange={handleValueChange("placeOfBirth.barangay")}
            {...error?.["placeOfBirth.barangay"]}
          />
          <SecondaryInput
            label=" "
            placeholder="Enter City"
            value={voter.placeOfBirth?.city}
            onValueChange={handleValueChange("placeOfBirth.city")}
            {...error?.["placeOfBirth.city"]}
          />
          <SecondaryInput
            label=" "
            placeholder="Enter Province"
            value={voter.placeOfBirth?.province}
            onValueChange={handleValueChange("placeOfBirth.province")}
            {...error?.["placeOfBirth.province"]}
          />
        </div>

        <RadioSelect
          className="text-xl text-gray-400 mb-5"
          items={enumToKeyLabel(CivilStatus)}
          label="Civil Status"
          value={voter.civilStatus}
          onValueChange={handleValueChange("civilStatus")}
          {...error?.["civilStatus"]}
        />

        <SecondaryInput
          label="Citizenship"
          value={voter.citizenship}
          onValueChange={handleValueChange("citizenship")}
          {...error?.["citizenship"]}
        />

        <Checkbox
          isSelected={voter.socialGroup?.includes("illiterate")}
          onValueChange={handleSocialGroupChange("illiterate")}
        >
          Illiterate
        </Checkbox>
        <Checkbox
          isSelected={voter.socialGroup?.includes("indigenous")}
          onValueChange={handleSocialGroupChange("indigenous")}
        >
          Indigenous People
        </Checkbox>
        <Checkbox isSelected={voter.socialGroup?.includes("pwd")} onValueChange={handleSocialGroupChange("pwd")}>
          Person with Disability
        </Checkbox>
      </div>

      <div className="flex flex-col gap-5 bg-blue-400/5 px-5 py-5">
        <span className="mt-5 text-gray-500 text-xl">Family Number</span>
        <div className="flex flex-col gap-5 items-baseline">
          {voter.family?.map((member, index) => {
            return (
              <div key={index} className="w-full grid grid-cols-2 gap-4">
                <SecondaryInput
                  label="Name"
                  value={member.name}
                  onValueChange={handleValueChange(`family.${index}.name`)}
                  {...error?.[`family.${index}.name`]}
                />
                <SecondarySelection
                  items={enumToKeyLabel(FamilyRelation)}
                  label="Relation"
                  placeholder="Relation"
                  selectedKeys={[member.relation]}
                  onValueChange={handleValueChange(`family.${index}.relation`)}
                  {...error?.[`family.${index}.relation`]}
                />
              </div>
            );
          })}

          <IconButton
            icon={<MdOutlineAdd className="text-2xl" />}
            label="Add Family Member"
            size="sm"
            onPress={handleAddFamily}
          />
        </div>
      </div>
    </>
  );
}
