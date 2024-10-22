import { z } from "zod";

import { UserEntity } from "./UserSchema";
import * as UserAction from "./UserAction";

export type User = z.input<typeof UserEntity>;
export const User = UserAction;
