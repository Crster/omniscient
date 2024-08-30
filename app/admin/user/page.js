"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncList } from "@react-stately/data";
import { useDisclosure } from "@nextui-org/modal";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { DataTable } from "../../../modules/components/theme/DataTable";
import { PrimaryButton } from "../../../modules/components/theme/Button";
import NewUserModal from "../../../modules/components/modal/new-user";
import EditUserModal from "../../../modules/components/modal/edit-user";
import RemoveUserModal from "../../../modules/components/modal/remove-user";
import listUser from "../../../modules/actions/listUser";


export default function UserPage() {
  const newUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const removeUserModal = useDisclosure();

  const [userToEdit, setUserToEdit] = useState();
  const [userToRemove, setUserToRemove] = useState();

  const columns = [
    {
      key: "role",
      label: "Role",
      allowsSorting: true,
    },
    {
      key: "name",
      label: "Name",
      allowsSorting: true,
    },
    {
      key: "email",
      label: "Email",
      allowsSorting: true,
    },
    {
      key: "action",
      label: "",
    },
  ];

  const rows = useAsyncList({
    load: async () => {
      const result = await listUser();
      if (!result.success) {
        toast.error(result.error);
      }

      return { items: result.data ?? [] };
    },
  });

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
          startContent={<MdOutlineAdd className="inline text-2xl align-top" />}
        >
          Add User
        </PrimaryButton>
      </div>

      <DataTable title="User List" columns={columns} rows={rows} />
    </>
  );
}
