import { z } from "zod";

import { UserRole } from "../Data/UserRole";

import { toPasswordHash, toEmptyString } from "@/libraries/Generator";

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^[A-Za-z]\w{7,14}$/, "Password should contain upper and lower case charater")
    .transform(toPasswordHash),
  role: z.nativeEnum(UserRole).default(UserRole.Admin),
  createdOn: z
    .date()
    .default(() => new Date())
    .optional(),
  updatedOn: z
    .date()
    .default(() => new Date())
    .optional(),
});

export const UserEntity = UserSchema.extend({
  userId: z.string().optional(),
  password: z.string().transform(toEmptyString),
});
