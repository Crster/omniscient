import { z } from "zod";

import { ValidationError } from "@/libraries/Error";

const schema = z.object({
  userId: z.string(),
});

export type removeUserRequest = z.infer<typeof schema>;

export function createRemoveUserRequest(input: removeUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
