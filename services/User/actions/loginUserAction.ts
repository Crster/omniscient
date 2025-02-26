import { UserRepository } from "../repository";
import { loginUserRequest } from "../requests/loginUserRequest";

import { addUserAction } from "./addUserAction";
import { getUserAction } from "./getUserAction";

import { AuthorizationError } from "@/libraries/Error";
import { UserRole } from "@/services/user-role/model";

export async function loginUserAction(request: loginUserRequest) {
  const userRepo = new UserRepository();
  let user = await userRepo.getByEmail(request.email);

  if (!user) {
    if (await userRepo.hasItem()) {
      throw new AuthorizationError("User not found");
    }

    const userId = await addUserAction({
      name: "System Admin",
      email: request.email,
      password: request.password,
      role: UserRole.Admin,
    });

    user = await getUserAction({ userId });
  }

  if (user.password !== request.password) throw new AuthorizationError("User not found", user);

  return user;
}
