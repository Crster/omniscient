import { z } from "zod";

import { UserRole } from "../Data/UserRole";

export const UserListSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});
