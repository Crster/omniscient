import { apiHandler } from "@/libraries/ApiHandler";
import { Redirect } from "@/libraries/Error";
import { createLoginUserRequest } from "@/services/user/requests/loginUserRequest";
import { loginUserAction } from "@/services/user/actions/loginUserAction";

export default apiHandler(async (req) => {
  const request = createLoginUserRequest(req.value);
  const user = await loginUserAction(request);

  req.session.user = user.userId;
  await req.session?.save();

  throw new Redirect("/", "Login success");
});
