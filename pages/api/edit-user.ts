import { apiHandler } from "@/libraries/ApiHandler";
import { editUserAction } from "@/services/user/actions/editUserAction";
import { createEditUserRequest } from "@/services/user/requests/editUserRequest";

export default apiHandler(async (req) => {
  const request = createEditUserRequest({ userId: req.key as string, user: req.value });

  await editUserAction(request);
});
