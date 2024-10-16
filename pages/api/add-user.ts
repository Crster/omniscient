import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";
import { User } from "@/models/User";

export default apiHandler(async (req) => {
  const userId = await User.save(req.value);

  if (!userId) throw new NotCreatedError("User is not created", { userId });

  return userId;
});
