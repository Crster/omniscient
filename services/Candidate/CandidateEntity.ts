import { z } from "zod";

import { Position } from "../Data/Position";
import { Gender } from "../Data/Gender";

export type CandidateEntity = z.input<typeof CandidateEntity>;

export const CandidateEntity = z.object({
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
