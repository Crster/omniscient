import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError } from "@/libraries/Error";
import { Trash } from "@/services/Trash/Trash";
import { TrashRepository } from "@/services/Trash/TrashRepository";
import { UserRepository } from "@/services/User/UserRepository";

export default apiHandler(async (req) => {
  if (!req.key) throw new BadRequestError("key is required", { key: "missing" });

  const userRepo = new UserRepository();
  const trashRepo = new TrashRepository();

  const user = await userRepo.remove(req.key);

  const trash = new Trash({
    entityType: "users",
    entityId: user.userId as string,
    entity: user,
    deletedBy: req.session.user as string,
  });

  await trashRepo.create(trash);
});
