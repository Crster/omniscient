"use client";

import { MdOutlineFilterAlt } from "react-icons/md";
import { PrimaryButton } from "../../../modules/components/theme/Button";
import { DataTable } from "../../../modules/components/theme/DataTable";

export default function DeathPage() {
  const deathTableColumns = [
    {
      name: "precinct_no",
      label: "Precinct No.",
      sortable: true,
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
      name: "died",
      label: "Died",
      sortable: true,
      template: (value) => value.toISOString()
    },
  ];

  const handleOnload = () => {
    return Promise.resolve([
        {
            id: Math.random(),
            precinct_no: "NHD823",
            name: "John Doe",
            purok: "Mahayag",
            barangay: "Iwanan",
            died: new Date(),
        },
        {
            id: Math.random(),
            precinct_no: "FDR231",
            name: "John Cena",
            purok: "Malaya",
            barangay: "Iwanan",
            died: new Date(),
        },
        {
            id: Math.random(),
            precinct_no: "JJD321",
            name: "John Martian",
            purok: "Dulom",
            barangay: "Lapitan",
            died: new Date(),
        }
    ]);
  };

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
        columns={deathTableColumns}
        onLoad={handleOnload}
      />
    </>
  );
}
