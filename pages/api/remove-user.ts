import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { UserRepo } from "@/models/User/UserRepository";

export default apiHandler(async (req) => {
  if (!req.key) throw new BadRequestError("key is required", { key: "missing" });

  const user = await UserRepo.getById(req.key);

  await UserRepo.remove(user);

  return user;
});
