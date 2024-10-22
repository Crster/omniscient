import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { User } from "@/services/User";

export default apiHandler<User, void>(async (req) => {
  if (!req.key) throw new BadRequestError("Key is required", { key: "required" });
  if (!req.value) throw new BadRequestError("Value is required", { value: "required" });

  await User.update(req.key, req.value);
});
