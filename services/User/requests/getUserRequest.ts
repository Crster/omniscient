import { z } from "zod";

import { BadRequestError } from "@/libraries/Error";

const schema = z.object({
  userId: z.string(),
});

export type getUserRequest = z.infer<typeof schema>;

export function createGetUserRequest(input: getUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new BadRequestError("Invalid request input", error);

  return data;
}
