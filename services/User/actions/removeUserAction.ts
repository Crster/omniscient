import { UserRepository } from "../repository";
import { removeUserRequest } from "../requests/removeUserRequest";

import { InternalServerError } from "@/libraries/Error";

const userRepo = new UserRepository();

export async function removeUserAction(request: removeUserRequest) {
  const success = await userRepo.remove(request.userId);

  if (!success) throw new InternalServerError("Failed to remove user", { success });
}
