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
import useApiRequest from "@/components/hook/useApiRequest";
import { UserList } from "@/models/UserList";
import { User } from "@/models/User";

export default function UserPage() {
  const newUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const removeUserModal = useDisclosure();
  const api = useApiRequest();

  const [userToEdit, setUserToEdit] = useState<UserList>();
  const [userToRemove, setUserToRemove] = useState<UserList>();

  const columns: Array<DataTableColumn<UserList>> = [
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

  const rows = useAsyncList<UserList>({
    getKey: (item) => item.userId,
    load: async () => {
      const result = await api<UserList[]>("list-user");

      return { items: result.success ? result.data : [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: _.orderBy(items, sortDescriptor.column, sortDescriptor.direction === "descending" ? "desc" : "asc"),
      };
    },
  });

  const handleNewUser = async (user: User) => {
    const result = await api("add-user", user);

    if (result.success) {
      newUserModal.onClose();
      rows.append({ userId: result.data, ...user });
    } else {
      toast.error(result.error as string);

      if (result.data?.errorCode === "ValidationError") {
        const errRet = new Map<string, any>();

        for (const errField of result.data?.reason) {
          errRet.set(errField.path.join("."), {
            isInvalid: true,
            errorMessage: errField.message,
          });
        }

        return Object.fromEntries(errRet);
      }
    }
  };

  const handleSaveUser = async (userId: string, user: User) => {
    const result = await api("edit-user", userId, user);

    if (result.success) {
      editUserModal.onClose();
      rows.update(userId, { userId, ...user });
    } else {
      toast.error(result.error as string);

      if (result.data?.errorCode === "ValidationError") {
        const errRet = new Map<string, any>();

        for (const errField of result.data?.reason) {
          errRet.set(errField.path.join("."), {
            isInvalid: true,
            errorMessage: errField.message,
          });
        }

        return Object.fromEntries(errRet);
      }
    }
  };

  const handleRemoveUser = async (user: UserList) => {
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
