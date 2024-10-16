import { User } from "./User";
import { UserRole } from "./UserRole";

export type UserList = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
};

export const UserList = {
  async generate() {
    const result = await User.collection.find({}).toArray();

    return result.map((item) => {
      const ret: UserList = {
        userId: item._id.toHexString(),
        name: item.name,
        email: item.email,
        role: item.role,
      };

      return ret;
    });
  },
};
