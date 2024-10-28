import { orderBy } from "lodash";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncList } from "@react-stately/data";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

import { DataTable, DataTableColumn } from "@/components/theme/DataTable";
import { PrimaryButton } from "@/components/theme/Button";
import useApiRequest from "@/components/hook/useApiRequest";
import { User } from "@/services/User";
import { UserList } from "@/services/UserList";
import Modal from "@/components/theme/Modal";
import { PrimaryInput } from "@/components/theme/Input";
import { Selection } from "@/components/theme/Selection";
import PasswordInput from "@/components/theme/PasswordInput";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { UserRole } from "@/services/Data/UserRole";

export default function UserPage() {
  const api = useApiRequest();
  const [selectedUser, setSelectedUser] = useState<User>();

  const loadSelectedUser = async (value: UserList) => {
    const result = await api<User>("get-user", value.userId);

    if (result.status === "success") {
      setSelectedUser(result.data);
    } else if (result.status === "error") {
      toast.error(result.data.message);
    }
  };

  const columns: Array<DataTableColumn<UserList>> = [
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
            <button onClick={() => loadSelectedUser(item)}>
              <MdOutlineEdit className="text-2xl text-blue-500" />
            </button>

            <button onClick={() => loadSelectedUser(item)}>
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
      const result = await api("list-user");

      return { items: result.status === "success" ? result.data : [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: orderBy(items, sortDescriptor.column, sortDescriptor.direction === "descending" ? "desc" : "asc"),
      };
    },
  });

  const handleNewUser = async (user: User) => {
    const result = await api("add-user", user);

    if (result.status === "success") {
      rows.append({
        userId: user.userId as string,
        email: user.email,
        name: user.name,
        role: user.role ?? UserRole.Admin,
      });
    } else if (result.status === "error") {
      toast.error(result.data.message);

      if (result.data.error === "ValidationError") {
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

  const handleSaveUser = async (user: User) => {
    const result = await api("edit-user", user.userId, user);

    if (result.status === "success") {
      rows.update(user.userId as string, {
        userId: user.userId as string,
        email: user.email,
        name: user.name,
        role: user.role ?? UserRole.Admin,
      });
    } else if (result.status === "error") {
      toast.error(result.data.message);

      if (result.data.error === "ValidationError") {
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

  const handleCancelUserModal = () => {
    setSelectedUser(undefined);
  };

  const handleOkUserModal = () => {
    if (selectedUser) {
      if (selectedUser.userId) {
        handleSaveUser(selectedUser);
      } else {
        handleNewUser(selectedUser);
      }
    }

    handleCancelUserModal();
  };

  return (
    <>
      <Modal data={selectedUser} title="New User" onCancel={handleCancelUserModal} onOk={handleOkUserModal}>
        {(user) => (
          <>
            <PrimaryInput
              label="Name"
              placeholder="Input Name"
              value={user.name}
              onValueChange={(val) => setSelectedUser({ ...user, name: val })}
            />
            <PrimaryInput defaultValue={user.email} isReadOnly={true} label="Email" placeholder="Input Email" />
            <PasswordInput
              label="New Password"
              placeholder="Input Password"
              value={user.password}
              onValueChange={(val) => setSelectedUser({ ...user, password: val })}
            />
            <Selection
              items={enumToKeyLabel(UserRole)}
              label="User Role"
              placeholder="Select Role"
              selectedKeys={[user.role ?? UserRole.Admin]}
              onValueChange={(val) => setSelectedUser({ ...user, role: val })}
            />
          </>
        )}
      </Modal>

      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">User List</h2>
        <PrimaryButton
          className="px-2 py-2 w-32 justify-self-end"
          startContent={<MdOutlineAdd className="inline text-2xl align-top" />}
          onPress={() => setSelectedUser({ name: "", email: "", password: "", role: UserRole.Admin })}
        >
          Add User
        </PrimaryButton>
      </div>

      <DataTable columns={columns} keyField="userId" rows={rows} title="User List" />
    </>
  );
}
