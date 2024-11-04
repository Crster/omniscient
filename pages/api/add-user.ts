import { apiHandler } from "@/libraries/ApiHandler";
import { addUserAction } from "@/services/user/actions/addUserAction";
import { createAddUserRequest } from "@/services/user/requests/addUserRequest";

export default apiHandler(async (req) => {
  const request = createAddUserRequest(req.value as any);
  const userId = await addUserAction(request);

  return userId;
});
