import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { User } from "@/services/User/User";
import { UserRepository } from "@/services/User/UserRepository";

export default apiHandler<User, void>(async (req) => {
  if (!req.key) throw new BadRequestError("Key is required", { key: "required" });
  if (!req.value) throw new BadRequestError("Value is required", { value: "required" });

  const userRepo = new UserRepository();
  const user = await userRepo.getById(req.key);

  if (req.value?.name) user.name = req.value.name;
  if (req.value?.email) user.email = req.value.email;
  if (req.value?.password) user.password = req.value.password;
  if (req.value?.role) user.role = req.value.role;

  await userRepo.update(user);
});
