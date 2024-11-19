import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineSave } from "react-icons/md";
import { flatten, unflatten } from "flat";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { SecondaryInput } from "@/components/theme/Input";
import { PrimaryButton } from "@/components/theme/Button";
import useApiRequest, { ApiResponse } from "@/components/hook/useApiRequest";
import { RadioSelect, SecondarySelection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { ICandidate } from "@/services/candidate/model";
import { Position } from "@/services/position/model";
import { Gender } from "@/services/gender/model";
import useValidationState from "@/components/hook/useValidationState";
import { extractModified, fillDefault } from "@/libraries/Transformer";
import { getCandidateAction } from "@/services/candidate/actions/getCandidateAction";
import { createGetCandidateRequest } from "@/services/candidate/requests/getCandidateRequest";

export async function getServerSideProps(context: GetServerSidePropsContext<{ candidateId: string }>) {
  const candidateId = context.params?.candidateId || "new-candidate";

  let currentCandidate: ICandidate = {
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

  if (candidateId !== "new-candidate") {
    const request = createGetCandidateRequest({ candidateId });
    const candidate = await getCandidateAction(request);

    currentCandidate = fillDefault(currentCandidate, candidate);
  }

  return {
    props: {
      candidateId,
      currentCandidate,
    },
  };
}

export default function VoterDetailPage({ currentCandidate }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const api = useApiRequest();
  const [candidate, setCandidate] = useState(currentCandidate);
  const [error, setError] = useValidationState();

  const handleValueChange = (property: string) => {
    return (value: any) => {
      const tmpData: Record<string, any> = flatten(candidate);

      tmpData[property] = value;

      const newData: typeof currentCandidate = unflatten(tmpData);

      setCandidate(newData);
    };
  };

  const handleSave = async () => {
    let response: ApiResponse<string>;

    if (router.query.candidateId === "new-candidate") {
      response = await api(
        "add-candidate",
        extractModified<ICandidate>(currentCandidate, candidate, ["gender", "position"]),
      );
    } else {
      response = await api(
        "edit-candidate",
        router.query.candidateId,
        extractModified<ICandidate>(currentCandidate, candidate, ["gender", "position"]),
      );
    }

    if (response.status === "success") {
      const candidateId = response.data;

      toast.success("Successfully save candidate " + candidate.name);
      router.replace(`/admin/candidate/${candidateId}`);
    } else if (response.status === "error") {
      setError(response.data.reason);
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
