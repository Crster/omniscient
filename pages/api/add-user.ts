import UserService from "@/models/User/UserService";
import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";

export default apiHandler(async (req) => {
  const userService = new UserService();

  const userId = await userService.create(req.value);

  if (!userId) throw new NotCreatedError("User is not created", { userId });

  return userId;
});
