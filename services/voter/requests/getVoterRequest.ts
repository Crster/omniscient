import { z } from "zod";

import { ValidationError } from "@/libraries/Error";

const schema = z.object({
  voterId: z.string(),
});

export type getVoterRequest = z.infer<typeof schema>;

export function createGetVoterRequest(input: z.input<typeof schema>) {
  const { success, data, error } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
