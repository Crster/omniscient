import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { toPasswordHash } from "@/libraries/TransformerX";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).transform(toPasswordHash),
});

export type loginUserRequest = z.infer<typeof schema>;

export function createLoginUserRequest(input: loginUserRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
