import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ReactComponent } from "@/types/ReactComponent";
import { userPageContext } from "@/contexts/user";

export const UserTable: ReactComponent = () => {
  const { userList } = userPageContext.Consumer();

  return (
    <Table isStriped removeWrapper aria-label="User List" className="my-4">
      <TableHeader>
        <TableColumn>User Role</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Name</TableColumn>
      </TableHeader>

      <TableBody items={userList.items}>
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
