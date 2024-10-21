import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { UserRepository } from "@/services/User/UserRepository";

export default apiHandler(async (req) => {
  if (!req.key) throw new BadRequestError("Key is required", { key: "required" });

  const userRepo = new UserRepository();

  return await userRepo.getById(req.key);
});
