import { z } from "zod";

import { BadRequestError } from "@/libraries/Error";
import { UserRole } from "@/services/user-role/model";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
});

export type AddUserRequest = z.infer<typeof schema>;

export function createAddUserRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new BadRequestError("Invalid request input", error);

  return data;
}
