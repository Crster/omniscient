import { getUsers } from "@/services/user/user.query";
import { Respawn } from "@/utils/respawn";

export default new Respawn()
  .get(() => {
    return getUsers();
  })
  .handle();
