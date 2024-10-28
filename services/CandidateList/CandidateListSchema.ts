import { z } from "zod";

import { Position } from "../Data/Position";

export const CandidateListSchema = z.object({
  candidateId: z.string(),
  rank: z.number(),
  name: z.string(),
  position: z.nativeEnum(Position),
  voters: z.number(),
  popularity: z.number().default(0),
  photoUrl: z.string().optional(),
  party: z.string().optional(),
});
