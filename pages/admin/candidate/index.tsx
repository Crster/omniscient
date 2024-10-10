import _ from "lodash";
import { useAsyncList } from "@react-stately/data";

import { PrimaryButton } from "@/components/theme/Button";
import { DataTable, DataTableColumn } from "@/components/theme/DataTable";

export default function CandidatePage() {
  const columns: Array<DataTableColumn<any>> = [
    {
      key: "rank",
      label: "Rank",
      allowsSorting: true,
      className: "font-medium",
      template: (value) => {
        return <span>No. {value}</span>;
      },
    },
    {
      key: "name",
      label: "Name",
      allowsSorting: true,
      className: "font-medium",
    },
    {
      key: "vote",
      label: "Votes",
      allowsSorting: true,
      className: "font-medium text-white",
    },
    {
      key: "popular",
      label: "Popular Vote",
      allowsSorting: true,
      className: "font-medium text-white",
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
        <h2 className="text-4xl text-blue-500 font-medium">Candidates</h2>
        <PrimaryButton className="px-2 py-2 justify-self-end">Barangay Ubalde</PrimaryButton>
      </div>

      <h3 className="text-xl font-medium">Barangay Ubalde</h3>

      <div className="flex flex-row gap-5 text-base text-gray-500">
        <span className="text-blue-500 font-medium">Brgy. Captain</span>
        <span className="font-gray-300 font-semibold">/</span>
        <span>Brgy. Kagawad</span>
        <span className="font-gray-300 font-semibold">/</span>
        <span>Brgy. Councilor</span>
        <span className="font-gray-300 font-semibold">/</span>
        <span>Chairman</span>
        <span className="font-gray-300 font-semibold">/</span>
        <span>Youth Council</span>
      </div>

      <div className="rounded bg-blue-50 px-5 py-8">
        <span className="text-xl font-medium">Change of Winning</span>
        <p className="text-sm text-gray-400 mt-3">
          IMPORTANT: Total count as of <strong>May 13, 2022 3:19 PM</strong> includes total of
          <strong>474,295</strong> votes from <strong>61.51%</strong> precincts of Overseas Absentee Votes
        </p>

        <div className="grid grid-cols-3 mt-5">
          <div className="flex flex-col text-center">
            <span className="text-gray-500 text-sm">Total Goal</span>
            <span className="text-blue-500 font-medium text-sm">100% Win Votes</span>
          </div>
        </div>
        <div className="grid grid-cols-10 h-10 mt-5">
          <span className="bg-blue-500 rounded-tl-xl rounded-bl-xl" />
          <span className="bg-blue-500" />
          <span className="bg-blue-500" />
          <span className="bg-blue-500" />
          <span className="bg-blue-500" />
          <span className="bg-blue-500" />
          <span className="bg-blue-500" />
          <span className="bg-red-500" />
          <span className="bg-red-500" />
          <span className="bg-red-500 rounded-tr-xl rounded-br-xl" />
        </div>
      </div>

      <DataTable columns={columns} rows={rows} title="Candidate List" />
    </>
  );
}
