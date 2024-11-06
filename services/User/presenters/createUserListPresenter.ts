import { User, UserDto } from "../model";

import { createUserPrenter } from "./createUserPresenter";

export function createUserListPresenter(users: Array<User>): Array<UserDto> {
  return users.map((user) => createUserPrenter(user));
}
