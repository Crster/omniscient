import { Button } from "@heroui/react";
import { AppShell } from "@/components/AppShell";
import { PageTitle } from "@/components/PageTitle";
import { MaterialIcon } from "@/components/MaterialIcon";
import { UserTable } from "@/components/tables/UserTable";
import AddUserModal from "@/components/modals/AddUserModal";
import { userPageContext } from "@/contexts/user";

export default function UserPage() {
  return userPageContext.Provider((context) => (
    <AppShell menuKey="user">
      <PageTitle title="User List">
        <Button color="primary" startContent={<MaterialIcon icon="add" />} onPress={context.addUserModal.onOpen}>
          Add User
        </Button>
      </PageTitle>

      <UserTable />
      <AddUserModal />
    </AppShell>
  ));
}
