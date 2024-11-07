import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { UserRole } from "@/services/user-role/model";
import { toPasswordHash } from "@/libraries/Generator";

const schema = z.object({
  userId: z.string(),
  user: z.object({
    name: z.string().optional(),
    password: z.string().min(8).transform(toPasswordHash).optional(),
    role: z.nativeEnum(UserRole).optional(),
  }),
});

export type editUserRequest = z.infer<typeof schema>;

export function createEditUserRequest(input: editUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
