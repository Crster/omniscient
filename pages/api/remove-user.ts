import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, NotFoundError } from "@/libraries/Error";
import UserService from "@/models/User/UserService";

export default apiHandler(async (req) => {
  const userService = new UserService();

  if (!req.key) {
    throw new InvalidRequestError("key is required", { key: "missing" });
  }

  const user = await userService.remove(req.key);

  if (!user) throw new NotFoundError(`User (${req.key}) not found`, { user });
});
