import { apiHandler } from "@/libraries/ApiHandler";
import { User } from "@/models/User";

export default apiHandler(async (req) => {
  const ret = await User.getById(req.key as string);

  if (ret) {
    return User.removePassword(ret);
  }
});
