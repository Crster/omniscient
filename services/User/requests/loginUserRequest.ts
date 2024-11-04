import { z } from "zod";

import { BadRequestError } from "@/libraries/Error";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

export type loginUserRequest = z.infer<typeof schema>;

export function createLoginUserRequest(input: loginUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new BadRequestError("Invalid request input", error);

  return data;
}
