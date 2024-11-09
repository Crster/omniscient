import { z } from "zod";

import { ValidationError } from "@/libraries/Error";

const schema = z.object({
  filter: z.string().optional(),
});

export type listVoterRequest = z.infer<typeof schema>;

export function createListVoterRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
