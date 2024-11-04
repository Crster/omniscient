import { UserRepository } from "../repository";
import { getUserRequest } from "../requests/getUserRequest";

import { NotFoundError } from "@/libraries/Error";

const userRepo = new UserRepository();

export async function getUserAction(request: getUserRequest) {
  const user = await userRepo.getById(request.userId);

  if (!user) throw new NotFoundError("User not found", { user });

  return user;
}
