import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { SurveyStatus } from "@/services/survey-status/model";

const schema = z.object({
  voter: z.object({
    voterId: z.string(),
    name: z.string(),
  }),
  candidate: z.object({
    candidateId: z.string(),
    name: z.string(),
  }),
  status: z.nativeEnum(SurveyStatus).default(SurveyStatus.Undecided),
  surveyor: z.object({
    userId: z.string(),
    name: z.string(),
  }),
  validator: z.object({
    userId: z.string(),
    name: z.string(),
  }),
});

export type addSurveyRequest = z.infer<typeof schema>;

export function createAddSurveyRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
