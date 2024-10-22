import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { Trash } from "@/services/Trash/Trash";
import { User } from "@/services/User";

export default apiHandler(async (req) => {
  if (!req.key) throw new BadRequestError("key is required", { key: "missing" });

  const user = await User.remove(req.key);

  const trash: Trash = {
    entityType: "users",
    entityId: user.userId as string,
    entity: user,
    deletedBy: req.session.user as string,
  };

  await Trash.create(trash);
});
