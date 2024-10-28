import { z } from "zod";

export const VoterListSchema = z.object({
  voterId: z.string(),
  precinctNo: z.string(),
  name: z.string(),
  purok: z.string(),
  barangay: z.string(),
  candidate: z.string(),
  status: z.string(),
  surveyor: z.string(),
  validator: z.string(),
});
