import { editUserRequest } from "../requests/editUserRequest";
import { UserRepository } from "../repository";

import { InternalServerError } from "@/libraries/Error";

export async function editUserAction(request: editUserRequest) {
  const userRepo = new UserRepository();
  const success = await userRepo.update(request.userId, request.user);

  if (!success) throw new InternalServerError("Failed to update user", { success });

  return success;
}
