import { UserRepository } from "../repository";
import { AddUserRequest } from "../requests/addUserRequest";

import { NotCreatedError } from "@/libraries/Error";

const userRepo = new UserRepository();

export async function addUserAction(request: AddUserRequest) {
  const userId = await userRepo.create(request);

  if (!userId) throw new NotCreatedError("Failed to create user", { userId });

  return userId;
}
