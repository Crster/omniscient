import { apiHandler } from "@/libraries/ApiHandler";
import { getUserAction } from "@/services/user/actions/getUserAction";
import { createUserPrenter } from "@/services/user/presenters/createUserPresenter";
import { createGetUserRequest } from "@/services/user/requests/getUserRequest";

export default apiHandler(async (req) => {
  const request = createGetUserRequest({ userId: req.key as string });
  const user = await getUserAction(request);

  return createUserPrenter(user);
});
