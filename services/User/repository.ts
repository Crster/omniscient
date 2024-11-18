import { IUser, User } from "./model";

import { BaseRepository } from "@/libraries/BaseRepository";

export class UserRepository extends BaseRepository<User, IUser> {
  constructor() {
    super("users", (user) => {
      if (user) {
        return {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          userId: user._id.toHexString(),
        };
      }
    });
  }

  async getByEmail(email: string) {
    const collection = await this.getCollection();
    const result = await collection.findOne({ email });

    return this.transform(result);
  }

  async getListByEmail(filter?: string) {
    return filter ? this.getList({ email: { $regex: filter, $options: "i" } }) : this.getList();
  }
}
