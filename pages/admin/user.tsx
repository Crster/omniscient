import { Button } from "@heroui/react";
import { AppShell } from "@/components/AppShell";
import { PageTitle } from "@/components/PageTitle";
import { MaterialIcon } from "@/components/MaterialIcon";
import { UserTable } from "@/components/tables/UserTable";
import { useUserPageContext } from "@/contexts/user";
import { useEffect } from "react";

export default function UserPage() {
  const { init } = useUserPageContext();

  useEffect(() => {
    init();
  }, []);

  return (
    <AppShell menuKey="user">
      <PageTitle title="User List">
        <Button color="primary" startContent={<MaterialIcon icon="add" />}>
          Add User
        </Button>
      </PageTitle>

      <UserTable />
    </AppShell>
  );
}
