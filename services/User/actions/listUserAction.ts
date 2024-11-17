import { UserRepository } from "../repository";
import { listUserRequest } from "../requests/listUserRequest";

export async function listUserAction(request: listUserRequest) {
  const userRepo = new UserRepository();
  const users = await userRepo.getListByEmail(request.filter);

  return users;
}
