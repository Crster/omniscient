import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, Redirect } from "@/libraries/Error";
import { User } from "@/models/User";

export default apiHandler(async (props) => {
  let user = await User.getByCredential(props.value.email, props.value.password);

  if (!user) {
    user = await User.initAdminAccount(props.value.email, props.value.password).catch((err) => {
      throw new InvalidRequestError("Invalid login credential", { user, error: err.message });
    });
  }

  props.session.user = user?._id.toHexString();
  await props.session?.save();

  throw new Redirect("/", "Login success");
});
