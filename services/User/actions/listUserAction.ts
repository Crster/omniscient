import { UserRepository } from "../repository";
import { listUserRequest } from "../requests/listUserRequest";

const userRepo = new UserRepository();

export async function listUserAction(request: listUserRequest) {
  const users = await userRepo.getList(request.filter);

  return users;
}
