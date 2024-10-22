import { z } from "zod";

import { UserListSchema } from "./UserListSchema";
import * as UserListAction from "./UserListAction";

export type UserList = z.output<typeof UserListSchema>;
export const UserList = UserListAction;
