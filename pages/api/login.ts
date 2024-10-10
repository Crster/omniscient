import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, Redirect } from "@/libraries/Error";
import UserService from "@/models/User/UserService";

export default apiHandler(async (props) => {
  const userService = new UserService();
  const user = await userService.getByEmail(props.value.email, props.value.password);

  if (!user) throw new InvalidRequestError("Invalid login credentials", { user });

  props.session.user = user._id.toString();
  await props.session?.save();

  throw new Redirect("/", "Login success");
});
