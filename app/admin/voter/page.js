"use client";

import { useDisclosure } from "@nextui-org/modal";
import { PrimaryButton } from "../../../modules/components/theme/Button";
import { DataTable } from "../../../modules/components/theme/DataTable";
import { MdOutlineAdd, MdOutlineFilterAlt } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAsyncList } from "@react-stately/data";
import _ from "lodash";

export default function VoterPage() {
  const newVoterModal = useDisclosure();
  const router = useRouter()

  const columns = [
    {
      key: "precinct_no",
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
        if (value === "1# Supporter") {
          return (
            <span className="bg-blue-100 px-2 py-1 rounded-md text-xs">
              {value}
            </span>
          );
        } else {
          return (
            <span className="bg-orange-100 px-2 py-1 rounded-md text-xs">
              {value}
            </span>
          );
        }
      },
    },
    {
      key: "validator",
      label: "Validated By",
      allowsSorting: true,
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

  const handleSelection = (item) => {
    router.push(`/admin/voter/${item}`)
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">Voter List</h2>

        <div className="flex flex-row gap-1 justify-self-end">
          <PrimaryButton
            outline
            className="px-2 py-2 w-32 text-blue-700"
            onPress={newVoterModal.onOpen}
            startContent={
              <MdOutlineFilterAlt className="inline text-2xl align-top " />
            }
          >
            Filter
          </PrimaryButton>
          <PrimaryButton
            className="px-2 py-2 w-32"
            onPress={newVoterModal.onOpen}
            startContent={
              <MdOutlineAdd className="inline text-2xl align-top" />
            }
          >
            Add Voter
          </PrimaryButton>
        </div>
      </div>

      <DataTable
        title="Voter List"
        columns={columns}
        rows={rows}
      />
    </>
  );
}
