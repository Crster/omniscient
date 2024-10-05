import { z } from "zod";

export const trashSchema = z.object({
  type: z.string(),
  data: z.any(),
});
