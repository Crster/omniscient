import { editUserRequest } from "../requests/editUserRequest";
import { UserRepository } from "../repository";

import { NotModifiedError } from "@/libraries/Error";

const userRepo = new UserRepository();

export async function editUserAction(request: editUserRequest) {
  const success = await userRepo.update(request.userId, request.user);

  if (!success) throw new NotModifiedError("Failed to update user", { success });

  return success;
}
