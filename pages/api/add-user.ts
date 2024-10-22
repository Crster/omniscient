import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError, NotCreatedError } from "@/libraries/Error";
import { User } from "@/services/User";

export default apiHandler<User, void>(async (req) => {
  if (!req.value) throw new BadRequestError("Value is required", { value: "required" });

  const userId = await User.create(req.value);

  if (!userId) throw new NotCreatedError(`User ${req.value.name} not created`, { userId });
});
