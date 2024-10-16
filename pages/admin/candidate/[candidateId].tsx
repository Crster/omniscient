import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineSave } from "react-icons/md";
import { flatten, unflatten } from "flat";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { SecondaryInput } from "@/components/theme/Input";
import { PrimaryButton } from "@/components/theme/Button";
import useApiRequest from "@/components/hook/useApiRequest";
import { ApiResponse } from "@/libraries/ApiHandler";
import { RadioSelect, SecondarySelection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { Position } from "@/models/Position";
import { Gender } from "@/models/Gender";
import { Candidate } from "@/models/Candidate";

const defaultState: Candidate = {
  name: "",
  address: "",
  position: Position.Other,
  party: "",
  coalition: "",
  alias: "",
  gender: Gender.Male,
  photoUrl: "",
  email: "",
  mobileNo: "",
};

export default function VoterDetailPage() {
  const router = useRouter();
  const api = useApiRequest();
  const [candidate, setCandidate] = useState(defaultState);
  const [error, setError] = useState<Record<string, any>>({});

  const handleValueChange = (property: string) => {
    return (value: any) => {
      const tmpData: Record<string, any> = flatten(candidate);

      tmpData[property] = value;

      const newData: typeof defaultState = unflatten(tmpData);

      setCandidate(newData);
    };
  };

  const handleSave = async () => {
    let response: ApiResponse;

    if (router.query.candidateId === "new-candidate") {
      response = await api("add-candidate", candidate);
    } else {
      response = await api("edit-candidate", router.query.candidateId, candidate);
    }

    if (response.success) {
      const candidateId = response.data as string;

      toast.success("Successfully save candidate " + candidate.name);
      router.replace(`/admin/candidate/${candidateId}`);
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
        <Link href="./">Candidate List</Link>
        <span className="text-gray-500">/</span>
        <span className="text-blue-500">Profiling</span>
      </div>

      <div className="grid grid-cols-2">
        <h2 className="text-3xl text-blue-500">{router.query.candidateId}</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 place-self-end"
          startContent={<MdOutlineSave className="inline text-2xl align-top" />}
          onPress={handleSave}
        >
          Save
        </PrimaryButton>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-5 bg-blue-400/5 px-5 py-5">
        <SecondaryInput
          isRequired
          label="Full Name"
          value={candidate.name}
          onValueChange={handleValueChange("name")}
          {...error?.["name"]}
        />

        <SecondaryInput
          label="Alias"
          value={candidate.alias}
          onValueChange={handleValueChange("alias")}
          {...error?.["alias"]}
        />

        <SecondaryInput
          isRequired
          label="Address"
          value={candidate.address}
          onValueChange={handleValueChange("address")}
          {...error?.["address"]}
        />

        <SecondarySelection
          isRequired
          items={enumToKeyLabel(Position)}
          label="Position"
          selectedKeys={[candidate.position]}
          onValueChange={handleValueChange("position")}
          {...error?.["position"]}
        />

        <SecondaryInput
          label="Party"
          value={candidate.party}
          onValueChange={handleValueChange("party")}
          {...error?.["party"]}
        />

        <SecondaryInput
          label="Coalition"
          value={candidate.coalition}
          onValueChange={handleValueChange("coalition")}
          {...error?.["coalition"]}
        />

        <RadioSelect
          items={enumToKeyLabel(Gender)}
          label="Gender"
          value={candidate.gender}
          onValueChange={handleValueChange("gender")}
          {...error?.["gender"]}
        />

        <SecondaryInput
          label="Mobile"
          startContent={<Image alt="Philippines Phone Number" height={25} src="/ph-phone.svg" width={76} />}
          value={candidate.mobileNo}
          onValueChange={handleValueChange("mobileNo")}
          {...error?.["mobileNo"]}
        />

        <SecondaryInput
          label="Email"
          value={candidate.email}
          onValueChange={handleValueChange("email")}
          {...error?.["email"]}
        />
      </div>
    </>
  );
}
