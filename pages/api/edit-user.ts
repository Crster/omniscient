import UserService from "@/models/User/UserService";
import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, NotModifiedError } from "@/libraries/Error";

export default apiHandler(async (req) => {
  const userService = new UserService();

  if (!req.key) {
    throw new InvalidRequestError("key is required", { key: "missing" });
  }

  const success = await userService.update(req.key, req.value);

  if (!success) throw new NotModifiedError("User not modified", { success });
});
