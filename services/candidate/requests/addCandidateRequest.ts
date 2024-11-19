import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { Position } from "@/services/position/model";
import { Gender } from "@/services/gender/model";

const schema = z.object({
  name: z.string(),
  address: z.string(),
  position: z.nativeEnum(Position),
  party: z.string().optional(),
  coalition: z.string().optional(),
  alias: z.string().optional(),
  gender: z.nativeEnum(Gender).default(Gender.Male),
  photoUrl: z.string().url().optional(),
  email: z.string().email().optional(),
  mobileNo: z.string().optional(),
});

export type addCandidateRequest = z.infer<typeof schema>;

export function createAddCandidateRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  if (!data.photoUrl) {
    data.photoUrl = `https://ui-avatars.com/api/?format=png&name=${data.name.replace(" ", "+")}`;
  }

  return data;
}
