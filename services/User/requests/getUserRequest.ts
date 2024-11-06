import { z } from "zod";

import { ValidationError } from "@/libraries/Error";

const schema = z.object({
  userId: z.string(),
});

export type getUserRequest = z.infer<typeof schema>;

export function createGetUserRequest(input: getUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
