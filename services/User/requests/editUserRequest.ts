import { z } from "zod";

import { BadRequestError } from "@/libraries/Error";
import { UserRole } from "@/services/user-role/model";

const schema = z.object({
  userId: z.string(),
  user: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
  }),
});

export type editUserRequest = z.infer<typeof schema>;

export function createEditUserRequest(input: editUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new BadRequestError("Invalid request input", error);

  return data;
}
