import { z } from "zod";

import { ValidationError } from "@/libraries/Error";

const schema = z.object({
  candidateId: z.string(),
  voterId: z.array(z.string()),
});

export type listSurveyByVoterRequest = z.infer<typeof schema>;

export function createListSurveyByVoterRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
