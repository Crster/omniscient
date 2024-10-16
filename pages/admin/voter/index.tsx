import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAsyncList } from "@react-stately/data";
import _ from "lodash";

import { DataTable, DataTableColumn } from "@/components/theme/DataTable";
import { PrimaryButton } from "@/components/theme/Button";
import useApiRequest from "@/components/hook/useApiRequest";
import { Selection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { VoterList } from "@/models/VoterList";
import { Position } from "@/models/Position";

export default function VoterPage() {
  const router = useRouter();
  const api = useApiRequest();

  const columns: Array<DataTableColumn<VoterList>> = [
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
            <button
              onClick={() => {
                router.push(`/admin/voter/${item.voterId}`);
              }}
            >
              <MdOutlineEdit className="text-2xl text-blue-500" />
            </button>

            <button onClick={() => {}}>
              <MdOutlineDelete className="text-2xl text-gray-500" />
            </button>
          </div>
        );
      },
    },
  ];

  const rows = useAsyncList<VoterList>({
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
          <Selection className="px-2 w-60" items={enumToKeyLabel(Position)} />
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
