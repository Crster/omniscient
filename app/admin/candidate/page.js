"use client";

import _ from "lodash";
import { PrimaryButton } from "../../../modules/components/theme/Button";
import { DataTable } from "../../../modules/components/theme/DataTable";
import { Profile } from "../../../modules/components/theme/Profile";
import { useAsyncList } from "@react-stately/data";

export default function CandidatePage() {
  const columns = [
    {
      key: "rank",
      label: "Rank",
      allowSorting: true,
      className: "font-medium",
      template: (value) => {
        return <span>No. {value}</span>;
      },
    },
    {
      key: "name",
      label: "Name",
      allowSorting: true,
      className: "font-medium",
      template: (value) => {
        return (
          <Profile
            alt={`User Profile of ${value}`}
            name={value}
            title="Barangay Captain"
            src={`https://ui-avatars.com/api/?name=${value.replace(" ", "+")}`}
          />
        );
      },
    },
    {
      key: "vote",
      label: "Votes",
      allowSorting: true,
      className: "font-medium text-white",
      template: (value, row) => {
        const color = [
          "bg-blue-500",
          "bg-red-500",
          "bg-orange-500",
          "bg-yellow-500",
          "bg-lime-500",
          "bg-teal-500",
          "bg-indigo-500",
          "bg-fuchsia-500",
          "bg-rose-500",
        ];

        return (
          <span className={`${color[row.rank]} rounded-lg px-2 py-1`}>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        );
      },
    },
    {
      key: "popular",
      label: "Popular Vote",
      allowSorting: true,
      className: "font-medium text-white",
      template: (value, row) => {
        const color = [
          "bg-blue-500",
          "bg-red-500",
          "bg-orange-500",
          "bg-yellow-500",
          "bg-lime-500",
          "bg-teal-500",
          "bg-indigo-500",
          "bg-fuchsia-500",
          "bg-rose-500",
        ];

        return (
          <span className={`${color[row.rank]} rounded-lg px-1 py-1`}>
            {value}%
          </span>
        );
      },
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
        <h2 className="text-4xl text-blue-500 font-medium">Candidates</h2>
        <PrimaryButton className="px-2 py-2 justify-self-end">
          Barangay Ubalde
        </PrimaryButton>
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
          IMPORTANT: Total count as of <strong>May 13, 2022 3:19 PM</strong>{" "}
          includes total of
          <strong>474,295</strong> votes from <strong>61.51%</strong> precincts
          of Overseas Absentee Votes
        </p>

        <div className="grid grid-cols-3 mt-5">
          <Profile
            alt="User Profile 1"
            name="Cameron Williamson"
            title="Barangay Captain"
            src={"https://ui-avatars.com/api/?name=Cameron+Williamson"}
          />
          <div className="flex flex-col text-center">
            <span className="text-gray-500 text-sm">Total Goal</span>
            <span className="text-blue-500 font-medium text-sm">
              100% Win Votes
            </span>
          </div>
          <Profile
            alt="User Profile 2"
            name="Katona Beatrix"
            title="Barangay Captain"
            src={"https://ui-avatars.com/api/?name=Katona+Beatrix"}
          />
        </div>
        <div className="grid grid-cols-10 h-10 mt-5">
          <span className="bg-blue-500 rounded-tl-xl rounded-bl-xl"></span>
          <span className="bg-blue-500"></span>
          <span className="bg-blue-500"></span>
          <span className="bg-blue-500"></span>
          <span className="bg-blue-500"></span>
          <span className="bg-blue-500"></span>
          <span className="bg-blue-500"></span>
          <span className="bg-red-500"></span>
          <span className="bg-red-500"></span>
          <span className="bg-red-500 rounded-tr-xl rounded-br-xl"></span>
        </div>
      </div>

      <DataTable
        title="Candidate List"
        columns={columns}
        rows={rows}
      />
    </>
  );
}
