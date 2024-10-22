import { User } from "../User";

import { UserList } from ".";

export async function getList() {
  const users = await User.getList();

  return users.map((user) => {
    const ret: UserList = {
      email: user.email,
      name: user.name,
      role: user.role,
      userId: user.userId as string,
    };

    return ret;
  });
}
