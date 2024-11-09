import { z } from "zod";

import { ValidationError } from "@/libraries/Error";

const schema = z.object({
  candidateId: z.string(),
});

export type getCandidateRequest = z.infer<typeof schema>;

export function createGetCandidateRequest(input: getCandidateRequest) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
