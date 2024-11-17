import { UserRepository } from "../repository";
import { getUserRequest } from "../requests/getUserRequest";

import { InternalServerError } from "@/libraries/Error";

export async function getUserAction(request: getUserRequest) {
  const userRepo = new UserRepository();
  const user = await userRepo.getById(request.userId);

  if (!user) throw new InternalServerError("User not found", { user });

  return user;
}
