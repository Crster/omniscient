import { apiHandler } from "@/libraries/ApiHandler";
import { UserList } from "@/models/UserList";

export default apiHandler(async () => {
  const users = await UserList.generate();

  return users;
});
