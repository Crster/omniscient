import { User, UserDto } from "../model";

import { createUserPresenter } from "./createUserPresenter";

export function createUserListPresenter(users: Array<User>): Array<UserDto> {
  return users.map((user) => createUserPresenter(user));
}
