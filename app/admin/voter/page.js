"use client";

import { useDisclosure } from "@nextui-org/modal";
import { PrimaryButton } from "../../../components/theme/Button";
import { DataTable } from "../../../components/theme/DataTable";
import { MdOutlineAdd, MdOutlineFilterAlt } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function VoterPage() {
  const newVoterModal = useDisclosure();
  const router = useRouter()

  const voterTableColumns = [
    {
      name: "precinct_no",
      label: "Precinct No.",
      sortable: true,
      className: "text-blue-500",
    },
    {
      name: "name",
      label: "Name",
      sortable: true,
    },
    {
      name: "purok",
      label: "Purok",
      sortable: true,
    },
    {
      name: "barangay",
      label: "Brgy",
      sortable: true,
    },
    {
      name: "candidate",
      label: "Candidate",
      sortable: true,
      className: "text-blue-500",
    },
    {
      name: "status",
      label: "Status",
      sortable: true,
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
      name: "validator",
      label: "Validated By",
      sortable: true,
    },
  ];

  const handleOnLoad = () => {
    return Promise.resolve([
      {
        id: Math.random(),
        precinct_no: "B23465",
        name: "R.Kimaruu",
        purok: "Ubalde",
        barangay: "Ubalde",
        candidate: "Capt. Rene Ustorga",
        status: "#1 Supporter",
        validator: "Claire",
      },
      {
        id: Math.random(),
        precinct_no: "B23465",
        name: "P.Jomore",
        purok: "Lawaan",
        barangay: "Tunay",
        candidate: "Capt. Rene Ustorga",
        status: "#1 Supporter",
        validator: "Claire",
      },
      {
        id: Math.random(),
        precinct_no: "A43465",
        name: "K.Tored",
        purok: "Molmol",
        barangay: "Batisan",
        candidate: "Capt. Luga Wanan",
        status: "#1 Supporter",
        validator: "Claire",
      },
    ]);
  };

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
        columns={voterTableColumns}
        onLoad={handleOnLoad}
        onSelection={handleSelection}
      />
    </>
  );
}
