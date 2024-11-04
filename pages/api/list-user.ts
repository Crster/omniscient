import { apiHandler } from "@/libraries/ApiHandler";
import { listUserAction } from "@/services/user/actions/listUserAction";
import { createListUserRequest } from "@/services/user/requests/listUserRequest";

export default apiHandler(async (req) => {
  const request = createListUserRequest(req.value);
  const users = await listUserAction(request);

  return users;
});
