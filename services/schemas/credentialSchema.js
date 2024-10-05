import { z } from "zod"

export const credentialSchema = z.object({
  email: z.string().required().email(),
  password: z.string().required().min(4),
})