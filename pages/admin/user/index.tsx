import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";

import UserModal from "./_components/user-modal";

import { DataTable, useDataTable } from "@/components/theme/DataTable";
import { IconButton, PrimaryButton } from "@/components/theme/Button";
import useApiRequest from "@/components/hook/useApiRequest";
import { IUser, UserDto } from "@/services/user/model";
import { AskModal } from "@/components/theme/AskModal";

export default function UserPage() {
  const api = useApiRequest();
  const [modalMode, setModalMode] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>();

  const userTable = useDataTable<UserDto>({
    keyField: "userId",
    title: "User List",
    data: async () => await api("list-user"),
    columns: [
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
    ],
  });

  const handleModalOk = async (user?: IUser) => {
    if (user && modalMode === "new") {
      const result = await api("add-user", user);

      if (result.status === "error") return result.data.reason;

      userTable.rows.append({
        email: user.email,
        name: user.name,
        role: user.role,
        userId: result.data,
      });
    } else if (user && selectedUser && modalMode === "edit") {
      const result = await api("edit-user", selectedUser.userId, user);

      if (result.status === "error") return result.data.reason;

      userTable.rows.update(selectedUser.userId, {
        email: user.email ?? selectedUser.email,
        name: user.name ?? selectedUser.name,
        role: user.role ?? selectedUser.role,
        userId: result.data ?? selectedUser.userId,
      });
    } else if (selectedUser && modalMode === "delete") {
      const result = await api("remove-user", selectedUser.userId);

      if (result.status === "error") {
        toast.error(result.data.error);

        return true;
      }

      userTable.rows.remove(selectedUser.userId);
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

      <DataTable {...userTable} />
      <UserModal
        open={["new", "edit"].includes(modalMode)}
        user={userToDto(selectedUser)}
        onClose={setUserOperation("")}
        onOk={handleModalOk}
      />
      <AskModal
        danger
        okText="Remove"
        open={modalMode === "delete"}
        title="Remove"
        onClose={setUserOperation("")}
        onOk={handleModalOk}
      >
        <p>
          Are you sure that you want to remove{" "}
          <span className="font-medium">
            {selectedUser?.role} - {selectedUser?.name}
          </span>
          ?
        </p>
      </AskModal>
    </>
  );
}
