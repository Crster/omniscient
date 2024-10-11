import { MdOutlineAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAsyncList } from "@react-stately/data";
import _ from "lodash";
import { useState } from "react";

import { DataTable, DataTableColumn } from "@/components/theme/DataTable";
import { PrimaryButton } from "@/components/theme/Button";
import { VoterDto } from "@/models/Voter/VoterDto";
import useApiRequest from "@/components/hook/useApiRequest";
import { Selection } from "@/components/theme/Selection";
import { KeyLabel } from "@/libraries/EnumUtil";

export default function VoterPage() {
  const router = useRouter();
  const api = useApiRequest();
  const [candidates, setCandidates] = useState<Array<KeyLabel>>([]);

  const columns: Array<DataTableColumn<VoterDto>> = [
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
      template: () => {
        return <Selection items={candidates} />;
      },
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
  ];

  const rows = useAsyncList<VoterDto>({
    getKey: (item) => item.voterId,
    load: async () => {
      const result = await api("list-voter");

      return { items: result.success ? result.data : [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: _.orderBy(items, sortDescriptor.column, sortDescriptor.direction === "descending" ? "desc" : "asc"),
      };
    },
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

      <DataTable columns={columns} keyField="voterId" rows={rows} title="Voter List" />
    </>
  );
}
