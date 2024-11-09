import { UserRepository } from "../repository";
import { addUserRequest } from "../requests/addUserRequest";

import { InternalServerError } from "@/libraries/Error";

const userRepo = new UserRepository();

export async function addUserAction(request: addUserRequest) {
  const userId = await userRepo.create(request);

  if (!userId) throw new InternalServerError("Failed to create user", { userId });

  return userId;
}
