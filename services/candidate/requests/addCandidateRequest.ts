import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { Position } from "@/services/position/model";
import { Gender } from "@/services/gender/model";

const schema = z.object({
  name: z.string(),
  address: z.string(),
  position: z.nativeEnum(Position),
  party: z.string(),
  coalition: z.string(),
  alias: z.string(),
  gender: z.nativeEnum(Gender),
  photoUrl: z.string().url(),
  email: z.string().email(),
  mobileNo: z.string().optional(),
});

export type addCandidateRequest = z.infer<typeof schema>;

export function createAddCandidateRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}
