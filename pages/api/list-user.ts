import UserService from "@/models/User/UserService";
import { apiHandler } from "@/libraries/ApiHandler";

export default apiHandler(async (req) => {
  const userService = new UserService();

  const users = await userService.getList(req.value);

  return userService.toListUserDto(users);
});
