import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, NotFoundError } from "@/libraries/Error";
import { User } from "@/models/User";

export default apiHandler(async (req) => {
  if (!req.key) {
    throw new InvalidRequestError("key is required", { key: "missing" });
  }

  const user = await User.remove(req.key);

  if (!user) throw new NotFoundError(`User (${req.key}) not found`, { user });
});
