import { apiHandler } from "@/libraries/ApiHandler";
import { InvalidRequestError, NotModifiedError } from "@/libraries/Error";
import { User } from "@/models/User";

export default apiHandler(async (req) => {
  if (!req.key) {
    throw new InvalidRequestError("key is required", { key: "missing" });
  }

  const success = await User.save({ _id: req.key, ...req.value });

  if (!success) throw new NotModifiedError("User not modified", { success });
});
