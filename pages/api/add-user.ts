import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError, NotCreatedError } from "@/libraries/Error";
import { User } from "@/services/User/User";
import { UserRepository } from "@/services/User/UserRepository";

export default apiHandler<User, void>(async (req) => {
  if (!req.value?.password) throw new BadRequestError("Password is required");
  const user = new User(req.value);

  const userRepo = new UserRepository();
  const userId = await userRepo.create(user);

  if (!userId) throw new NotCreatedError(`User ${user.name} not created`, { userId });
});
