import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { UserRole } from "@/services/user-role/model";
import { toPasswordHash } from "@/libraries/Generator";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).transform(toPasswordHash),
  role: z.nativeEnum(UserRole).default(UserRole.Admin),
});

export type AddUserRequest = z.infer<typeof schema>;

export function createAddUserRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
