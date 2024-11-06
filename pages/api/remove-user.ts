import { apiHandler } from "@/libraries/ApiHandler";
import { removeUserAction } from "@/services/user/actions/removeUserAction";
import { createRemoveUserRequest } from "@/services/user/requests/removeUserRequest";

export default apiHandler(async (req) => {
  const request = createRemoveUserRequest({ userId: req.key as string });

  await removeUserAction(request);
});
