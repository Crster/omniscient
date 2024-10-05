import { z } from "zod";

export const userIdSchema =  z.string().required().hex().length(24).custom(objectId)

export const userSchema = z.object({
  userId: userIdSchema,
  name: z.string().required(),
  email: z.string().email(),
  password: z.string()
  .required()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .custom(sha256),
  role: z.enum(["admin", "surveyor", "validator"]),
});

export const newUserSchema = userSchema.omit({ userId: true });

export const updateUserSchema = userSchema.partial();