import { MdOutlineAdd, MdOutlineFilterAlt } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAsyncList } from "@react-stately/data";
import _ from "lodash";

import { DataTable, DataTableColumn } from "@/components/theme/DataTable";
import { PrimaryButton } from "@/components/theme/Button";
import { VoterDto } from "@/models/Voter/VoterDto";
import useApiRequest from "@/components/hook/useApiRequest";

export default function VoterPage() {
  const router = useRouter();
  const api = useApiRequest();

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
    },
    {
      key: "status",
      label: "Status",
      allowsSorting: true,
      template: (value) => {
        if (value.status === "pending") {
          return <span className="bg-blue-100 px-2 py-1 rounded-md text-xs">{value.status}</span>;
        } else {
          return <span className="bg-orange-100 px-2 py-1 rounded-md text-xs">{value.status}</span>;
        }
      },
    },
    {
      key: "validator",
      label: "Validated By",
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
            className="px-2 py-2 w-32 text-blue-700"
            startContent={<MdOutlineFilterAlt className="inline text-2xl align-top" />}
          >
            Filter
          </PrimaryButton>
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
