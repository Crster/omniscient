"use client";

import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import NewUserModal from "../../../components/modal/new-user";
import { DataTable } from "../../../components/theme/DataTable";

export default function UserPage() {
  const userTableColumns = [
    {
      name: "role",
      label: "Role",
      sortable: true,
      className: "text-blue-500",
    },
    {
      name: "name",
      label: "Name",
      sortable: true,
    },
    {
      name: "barangay",
      label: "Barangay",
      sortable: true,
    },
    {
      name: "status",
      label: "Status",
      sortable: true,
      className: "text-blue-500",
      template: (value) => {
        if (value === "Active") {
          return <span className="bg-blue-100 px-2 py-1 rounded-md">{value}</span>
        } else {
          return <span className="bg-orange-100 px-2 py-1 rounded-md">{value}</span>
        }
      },
    },
    {
      name: "action",
      label: "",
      sortable: false,
    },
  ];

  const handleOnload = () => {
    return Promise.resolve([
      {
        id: Math.random(),
        role: "Surveyor",
        name: "R.Kimaruu",
        barangay: "Ubalde",
        status: "Active",
        action: (
          <div className="flex flex-row gap-1 justify-end">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <MdOutlineDelete className="text-2xl text-gray-500" />
          </div>
        ),
      },
      {
        id: Math.random(),
        role: "Organizer",
        name: "R.Quisido",
        barangay: "Jerome",
        status: "Active",
        action: (
          <div className="flex flex-row gap-1 justify-end">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <MdOutlineDelete className="text-2xl text-gray-500" />
          </div>
        ),
      },
      {
        id: Math.random(),
        role: "Validator",
        name: "E.Bana",
        barangay: "Tondo",
        status: "Disable",
        action: (
          <div className="flex flex-row gap-1 justify-end">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <MdOutlineDelete className="text-2xl text-gray-500" />
          </div>
        ),
      },
      {
        id: Math.random(),
        role: "Surveyor",
        name: "N.Walana",
        barangay: "Borong",
        status: "Disable",
        action: (
          <div className="flex flex-row gap-1 justify-end">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <MdOutlineDelete className="text-2xl text-gray-500" />
          </div>
        ),
      },
      {
        id: Math.random(),
        role: "Organizer",
        name: "R.Quisido",
        barangay: "Jerome",
        status: "Active",
        action: (
          <div className="flex flex-row gap-1 justify-end">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <MdOutlineDelete className="text-2xl text-gray-500" />
          </div>
        ),
      },
      {
        id: Math.random(),
        role: "Validator",
        name: "L.Moko",
        barangay: "Tondo",
        status: "Active",
        action: (
          <div className="flex flex-row gap-1 justify-end">
            <MdOutlineEdit className="text-2xl text-blue-500" />
            <MdOutlineDelete className="text-2xl text-gray-500" />
          </div>
        ),
      },
    ]);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">User List</h2>
        <NewUserModal />
      </div>

      <DataTable
        title="User List"
        columns={userTableColumns}
        onLoad={handleOnload}
      />
    </>
  );
}
