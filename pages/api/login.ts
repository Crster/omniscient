import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, Redirect } from "@/libraries/Error";
import { User } from "@/models/User";

export default apiHandler(async (props) => {
  const user = await User.getByCredential(props.value.email, props.value.password);

  if (!user) throw new InvalidRequestError("Invalid login credentials", { user });

  props.session.user = user._id.toString();
  await props.session?.save();

  throw new Redirect("/", "Login success");
});
