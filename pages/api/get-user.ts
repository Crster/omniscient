import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { User } from "@/services/User";

export default apiHandler(async (req) => {
  if (!req.key) throw new BadRequestError("Key is required", { key: "required" });

  return await User.getById(req.key);
});
