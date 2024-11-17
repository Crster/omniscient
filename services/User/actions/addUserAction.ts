import { UserRepository } from "../repository";
import { addUserRequest } from "../requests/addUserRequest";

import { InternalServerError } from "@/libraries/Error";

export async function addUserAction(request: addUserRequest) {
  const userRepo = new UserRepository();
  const userId = await userRepo.create(request);

  if (!userId) throw new InternalServerError("Failed to create user", { userId });

  return userId;
}
