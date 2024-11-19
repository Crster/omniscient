import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { InferGetStaticPropsType } from "next";

import { DataTable, useDataTable } from "@/components/theme/DataTable";
import { IconButton, PrimaryButton } from "@/components/theme/Button";
import useApiRequest from "@/components/hook/useApiRequest";
import { Selection } from "@/components/theme/Selection";
import { VoterDto } from "@/services/voter/model";
import { listCandidateAction } from "@/services/candidate/actions/listCandidateAction";
import { KeyLabel } from "@/libraries/EnumUtil";

export async function getStaticProps() {
  const ret: Array<KeyLabel> = [];
  const candidates = await listCandidateAction({ filter: undefined });

  for (const candidate of candidates) {
    ret.push({ key: candidate.candidateId, label: candidate.name });
  }

  return { props: { candidates: ret } };
}

export default function VoterPage({ candidates }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const api = useApiRequest();

  const voterTable = useDataTable<VoterDto>({
    keyField: "voterId",
    title: "Voter List",
    data: async () => await api("list-voter"),
    columns: [
      {
        key: "precinctNo",
        label: "Precinct No.",
        allowsSorting: true,
        className: "text-blue-500",
      },
      {
        key: "name",
        label: "Name",
        allowsSorting: true,
      },
      {
        key: "purok",
        label: "Purok",
        allowsSorting: true,
      },
      {
        key: "barangay",
        label: "Brgy",
        allowsSorting: true,
      },
      {
        key: "candidate",
        label: "Candidate",
        allowsSorting: true,
        className: "text-blue-500",
      },
      {
        key: "status",
        label: "Status",
        allowsSorting: true,
      },
      {
        key: "surveyor",
        label: "Surveyor",
        allowsSorting: true,
      },
      {
        key: "validator",
        label: "Validator",
        allowsSorting: true,
      },
      {
        key: "action",
        label: "",
        template: (item) => {
          return (
            <div className="flex flex-row gap-1 justify-end">
              <IconButton
                icon={<MdOutlineEdit className="text-2xl text-blue-500" />}
                label="Edit"
                variant="light"
                onPress={() => {
                  router.push(`/admin/voter/${item.voterId}`);
                }}
              />

              <IconButton
                icon={<MdOutlineDelete className="text-2xl text-gray-500" />}
                label="Delete"
                variant="light"
                onPress={() => {}}
              />
            </div>
          );
        },
      },
    ],
  });

  const handleNew = () => {
    router.push("/admin/voter/new-voter");
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">Voter List</h2>

        <div className="flex flex-row gap-1 justify-self-end">
          <PrimaryButton
            className="px-2 py-2 w-32"
            startContent={<MdOutlineAdd className="inline text-2xl align-top" />}
            onPress={handleNew}
          >
            Add Voter
          </PrimaryButton>
        </div>
      </div>

      <div className="flex flex-row gap-1">
        <Selection className="px-2 w-60" items={candidates} label="Candidates" />
      </div>
      <DataTable {...voterTable} />
    </>
  );
}
