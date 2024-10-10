import { MdOutlineFilterAlt } from "react-icons/md";
import { useAsyncList } from "@react-stately/data";
import _ from "lodash";

import { PrimaryButton } from "@/components/theme/Button";
import { DataTable, DataTableColumn } from "@/components/theme/DataTable";

export default function DeathPage() {
  const columns: Array<DataTableColumn<any>> = [
    {
      key: "precinct_no",
      label: "Precinct No.",
      allowsSorting: true,
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
      key: "died",
      label: "Died",
      allowsSorting: true,
      template: (value) => value.toISOString(),
    },
  ];

  const rows = useAsyncList({
    load: async () => {
      return { items: [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: _.orderBy(items, sortDescriptor.column, sortDescriptor.direction === "descending" ? "desc" : "asc"),
      };
    },
  });

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">Death List</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 text-blue-700 justify-self-end"
          startContent={<MdOutlineFilterAlt className="inline text-2xl align-top " />}
        >
          Filter
        </PrimaryButton>
      </div>

      <DataTable columns={columns} rows={rows} title="Death List" />
    </>
  );
}
