"use client";

import { MdOutlineFilterAlt } from "react-icons/md";
import { PrimaryButton } from "../../../components/theme/Button";
import { DataTable } from "../../../components/theme/DataTable";
import { useAsyncList } from "@react-stately/data";
import _ from "lodash";

export default function DeathPage() {
  const columns = [
    {
      key: "precinct_no",
      label: "Precinct No.",
      allowSorting: true,
    },
    {
      key: "name",
      label: "Name",
      allowSorting: true,
    },
    {
      key: "purok",
      label: "Purok",
      allowSorting: true,
    },
    {
      key: "barangay",
      label: "Brgy",
      allowSorting: true,
    },
    {
      key: "died",
      label: "Died",
      allowSorting: true,
      template: (value) => value.toISOString()
    },
  ];

  const rows = useAsyncList({
    load: async () => {
      return { items: [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: _.orderBy(
          items,
          sortDescriptor.column,
          sortDescriptor.direction === "descending" ? "desc" : "asc"
        ),
      };
    },
  });

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">Death List</h2>
        <PrimaryButton
          outline
          className="px-2 py-2 w-32 text-blue-700 justify-self-end"
          startContent={
            <MdOutlineFilterAlt className="inline text-2xl align-top " />
          }
        >
          Filter
        </PrimaryButton>
      </div>

      <DataTable
        title="Death List"
        columns={columns}
        rows={rows}
      />
    </>
  );
}
