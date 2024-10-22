import { z } from "zod";

import { Position } from "../Data/Position";
import { Gender } from "../Data/Gender";

export const CandidateSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  position: z.nativeEnum(Position),
  party: z.string().min(1).optional(),
  coalition: z.string().min(1).optional(),
  alias: z.string().min(1).optional(),
  gender: z.nativeEnum(Gender).default(Gender.Male).optional(),
  photoUrl: z.string().url().optional(),
  email: z.string().email().optional(),
  mobileNo: z.string().min(1).optional(),
});

export const CandidateEntity = CandidateSchema.extend({
  candidateId: z.string().optional(),
});
