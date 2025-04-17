import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ReactComponent } from "@/types/ReactComponent";
import { useUserPageContext } from "@/contexts/user";

export const UserTable: ReactComponent = () => {
  const { users } = useUserPageContext();

  return (
    <Table isStriped removeWrapper className="my-4">
      <TableHeader>
        <TableColumn>User Role</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Name</TableColumn>
      </TableHeader>

      <TableBody items={users}>
        {(user) => (
          <TableRow key={user.id}>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
