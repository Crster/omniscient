import _ from "lodash";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncList } from "@react-stately/data";
import { useDisclosure } from "@nextui-org/modal";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

import { DataTable, DataTableColumn } from "@/components/theme/DataTable";
import { PrimaryButton } from "@/components/theme/Button";
import NewUserModal from "@/components/modal/NewUserModal";
import EditUserModal from "@/components/modal/EditUserModal";
import RemoveUserModal from "@/components/modal/RemoveUserModal";
import { UserDto } from "@/models/User/UserDto";
import useApiRequest from "@/components/hook/useApiRequest";

export default function UserPage() {
  const newUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const removeUserModal = useDisclosure();
  const api = useApiRequest();

  const [userToEdit, setUserToEdit] = useState<UserDto>();
  const [userToRemove, setUserToRemove] = useState<UserDto>();

  const columns: Array<DataTableColumn<UserDto>> = [
    {
      key: "userId",
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

  const rows = useAsyncList<UserDto>({
    getKey: (item) => item.userId,
    load: async () => {
      const result = await api("list-user");

      return { items: result.success ? result.data : [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: _.orderBy(items, sortDescriptor.column, sortDescriptor.direction === "descending" ? "desc" : "asc"),
      };
    },
  });

  const handleNewUser = async (user: UserDto) => {
    const result = await api("add-user", user);

    if (result.success) {
      newUserModal.onClose();
      rows.append({ ...user, userId: result.data });
    } else {
      toast.error(result.error as string);
    }
  };

  const handleSaveUser = async (updatedUser: UserDto) => {
    const { userId, ...update } = updatedUser;

    const result = await api("edit-user", userId, update);

    if (result.success) {
      editUserModal.onClose();
      rows.update(userId, updatedUser);
    } else {
      toast.error(result.error as string);
    }
  };

  const handleRemoveUser = async (user: UserDto) => {
    const result = await api("remove-user", user.userId);

    if (result.success) {
      removeUserModal.onClose();
      rows.remove(user.userId);
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <>
      <NewUserModal disclosure={newUserModal} onNew={handleNewUser} />
      <EditUserModal disclosure={editUserModal} user={userToEdit} onSave={handleSaveUser} />
      <RemoveUserModal disclosure={removeUserModal} user={userToRemove} onRemove={handleRemoveUser} />

      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">User List</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 justify-self-end"
          startContent={<MdOutlineAdd className="inline text-2xl align-top" />}
          onPress={newUserModal.onOpen}
        >
          Add User
        </PrimaryButton>
      </div>

      <DataTable columns={columns} keyField="userId" rows={rows} title="User List" />
    </>
  );
}
