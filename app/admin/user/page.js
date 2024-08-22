"use client";

import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDisclosure } from "@nextui-org/modal";
import { DataTable } from "../../../modules/components/theme/DataTable";
import { PrimaryButton } from "../../../modules/components/theme/Button";
import NewUserModal from "../../../modules/components/modal/new-user";
import EditUserModal from "../../../modules/components/modal/edit-user";
import { useState } from "react";
import RemoveUserModal from "../../../modules/components/modal/remove-user";

export default function UserPage() {
  const newUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const removeUserModal = useDisclosure();

  const [userToEdit, setUserToEdit] = useState();
  const [userToRemove, setUserToRemove] = useState();

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
          return (
            <span className="bg-blue-100 px-2 py-1 rounded-md">{value}</span>
          );
        } else {
          return (
            <span className="bg-orange-100 px-2 py-1 rounded-md">{value}</span>
          );
        }
      },
    },
    {
      name: "action",
      label: "",
      sortable: false,
      template: (item) => {
        return (
          <div className="flex flex-row gap-1 justify-end">
            <button
              onClick={() => {
                setUserToEdit(item);
                editUserModal.onOpen();
              }}
            >
              <MdOutlineEdit className="text-2xl text-blue-500" />
            </button>

            <button
              onClick={() => {
                setUserToRemove(item);
                removeUserModal.onOpen();
              }}
            >
              <MdOutlineDelete className="text-2xl text-gray-500" />
            </button>
          </div>
        );
      },
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
      },
      {
        id: Math.random(),
        role: "Organizer",
        name: "R.Quisido",
        barangay: "Jerome",
        status: "Active",
      },
      {
        id: Math.random(),
        role: "Validator",
        name: "E.Bana",
        barangay: "Tondo",
        status: "Disable",
      },
      {
        id: Math.random(),
        role: "Surveyor",
        name: "N.Walana",
        barangay: "Borong",
        status: "Disable",
      },
      {
        id: Math.random(),
        role: "Organizer",
        name: "R.Quisido",
        barangay: "Jerome",
        status: "Active",
      },
      {
        id: Math.random(),
        role: "Validator",
        name: "L.Moko",
        barangay: "Tondo",
        status: "Active",
      },
    ]);
  };

  return (
    <>
      <NewUserModal disclosure={newUserModal} />
      {userToEdit && (
        <EditUserModal
          user={userToEdit}
          disclosure={editUserModal}
          onClose={() => setUserToEdit(null)}
        />
      )}
      {userToRemove && (
        <RemoveUserModal
          user={userToRemove}
          disclosure={removeUserModal}
          onClose={() => setUserToRemove(null)}
        />
      )}

      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">User List</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 justify-self-end"
          onPress={newUserModal.onOpen}
          startContent={
            <MdOutlineAdd className="inline text-2xl align-top" />
          }
        >
          Add User
        </PrimaryButton>
      </div>

      <DataTable
        title="User List"
        columns={userTableColumns}
        onLoad={handleOnload}
      />
    </>
  );
}
