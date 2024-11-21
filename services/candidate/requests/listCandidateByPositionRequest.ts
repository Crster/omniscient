import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { Position } from "@/services/position/model";

const schema = z.object({
  position: z.nativeEnum(Position),
});

export type listCandidateByPositionRequest = z.infer<typeof schema>;

export function createListCandidateByPositionRequest(input: z.input<typeof schema>) {
  const { success, data, error } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
