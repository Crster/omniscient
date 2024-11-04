import { apiHandler } from "@/libraries/ApiHandler";
import { getUserAction } from "@/services/user/actions/getUserAction";
import { createGetUserRequest } from "@/services/user/requests/getUserRequest";

export default apiHandler(async (req) => {
  const request = createGetUserRequest({ userId: req.key as string });
  const user = await getUserAction(request);

  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
  };
});
