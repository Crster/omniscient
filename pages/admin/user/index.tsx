import { orderBy } from "lodash";
import { useAsyncList } from "@react-stately/data";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useState } from "react";

import UserModal from "./_components/user-modal";

import { DataTable, DataTableColumn } from "@/components/theme/DataTable";
import { IconButton, PrimaryButton } from "@/components/theme/Button";
import useApiRequest from "@/components/hook/useApiRequest";
import { IUser, UserDto } from "@/services/user/model";

export default function UserPage() {
  const api = useApiRequest();
  const [modalMode, setModalMode] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>();

  const columns: Array<DataTableColumn<UserDto>> = [
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
      template: (user: UserDto) => {
        return (
          <div className="flex flex-row gap-1 justify-end">
            <IconButton
              icon={<MdOutlineEdit className="text-2xl text-blue-500" />}
              label="Edit"
              variant="light"
              onPress={setUserOperation("edit", user)}
            />
            <IconButton
              icon={<MdOutlineDelete className="text-2xl text-gray-500" />}
              label="Delete"
              variant="light"
              onPress={setUserOperation("delete", user)}
            />
          </div>
        );
      },
    },
  ];

  const rows = useAsyncList<UserDto>({
    getKey: (item) => item.userId,
    load: async () => {
      const result = await api("list-user");

      return { items: result.status === "success" ? result.data : [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: orderBy(items, sortDescriptor.column, sortDescriptor.direction === "descending" ? "desc" : "asc"),
      };
    },
  });

  const handleModalOk = async (user: IUser) => {
    switch (modalMode) {
      case "new": {
        const result = await api("add-user", user);

        if (result.status === "error") return result.data.reason;

        rows.append({
          email: user.email,
          name: user.name,
          role: user.role,
          userId: result.data,
        });
        break;
      }
      case "edit": {
        if (selectedUser) {
          const result = await api("edit-user", selectedUser.userId, user);

          if (result.status === "error") return result.data.reason;

          rows.update(selectedUser.userId, {
            email: user.email ?? selectedUser.email,
            name: user.name ?? selectedUser.name,
            role: user.role ?? selectedUser.role,
            userId: result.data ?? selectedUser.userId,
          });
        }
        break;
      }
    }

    setModalMode("");
    setSelectedUser(undefined);
  };

  const setUserOperation = (mode: string, user?: UserDto) => {
    return () => {
      setModalMode(mode);
      setSelectedUser(user);
    };
  };

  const userToDto = (user?: UserDto): IUser | undefined => {
    if (user) {
      return {
        email: user.email,
        name: user.name,
        password: "",
        role: user.role,
      };
    }
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">User List</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 justify-self-end"
          startContent={<MdOutlineAdd className="inline text-2xl align-top" />}
          onPress={setUserOperation("new")}
        >
          Add User
        </PrimaryButton>
      </div>

      <DataTable columns={columns} keyField="userId" rows={rows} title="User List" />
      <UserModal
        open={!!modalMode}
        user={userToDto(selectedUser)}
        onClose={setUserOperation("")}
        onOk={handleModalOk}
      />
    </>
  );
}
