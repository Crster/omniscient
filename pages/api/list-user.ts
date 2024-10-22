import { apiHandler } from "@/libraries/ApiHandler";
import { UserList } from "@/services/UserList";

export default apiHandler(async () => {
  const users = await UserList.getList();

  return users;
});
