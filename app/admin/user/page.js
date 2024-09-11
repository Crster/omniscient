"use client";

import _ from "lodash";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncList } from "@react-stately/data";
import { useDisclosure } from "@nextui-org/modal";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { DataTable } from "../../../modules/components/theme/DataTable";
import { PrimaryButton } from "../../../modules/components/theme/Button";
import NewUserModal from "../../../modules/components/modal/NewUserModal";
import EditUserModal from "../../../modules/components/modal/EditUserModal";
import RemoveUserModal from "../../../modules/components/modal/RemoveUserModal";
import listUser from "../../../modules/actions/listUser";
import addUser from "../../../modules/actions/addUser";
import editUser from "../../../modules/actions/editUser";

export default function UserPage() {
  const newUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const removeUserModal = useDisclosure();

  const [userToEdit, setUserToEdit] = useState();
  const [userToRemove, setUserToRemove] = useState();

  const columns = [
    {
      key: "rowId",
      label: "UserId",
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
      className: "text-blue-500",
    },
    {
      key: "role",
      label: "Role",
      allowsSorting: true,
    },
    {
      key: "action",
      label: "",
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

  const rows = useAsyncList({
    getKey: (item) => {
      return item.rowId;
    },
    load: async () => {
      const result = await listUser();
      if (!result.success) {
        toast.error(result.error);
      }

      return { items: result.data ?? [] };
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

  const handleNewUser = async (user) => {
    const response = await addUser(user);
    if (response.success) {
      newUserModal.onClose();
      rows.append(response.data);
    } else {
      toast.error(response.error);
    }
  };

  const handleSaveUser = async (user, update) => {
    const response = await editUser({ id: user.rowId, ...update });
    if (response.success) {
      editUserModal.onClose();
      rows.update(user.rowId, response.data);
    } else {
      toast.error(response.error);
    }
  };

  const handleRemoveUser = (user) => {
    console.log({ user });
    removeUserModal.onClose();
  };

  return (
    <>
      <NewUserModal disclosure={newUserModal} onNew={handleNewUser} />
      <EditUserModal
        user={userToEdit}
        disclosure={editUserModal}
        onSave={handleSaveUser}
      />
      <RemoveUserModal
        user={userToRemove}
        disclosure={removeUserModal}
        onClose={handleRemoveUser}
      />

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
