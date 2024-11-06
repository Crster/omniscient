import { UserRepository } from "../repository";
import { getUserRequest } from "../requests/getUserRequest";

import { InternalServerError } from "@/libraries/Error";

const userRepo = new UserRepository();

export async function getUserAction(request: getUserRequest) {
  const user = await userRepo.getById(request.userId);

  if (!user) throw new InternalServerError("User not found", { user });

  return user;
}
