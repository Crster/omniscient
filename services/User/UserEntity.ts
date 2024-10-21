import { z } from "zod";

import { UserRole } from "../Data/UserRole";

import { toPasswordHash } from "@/libraries/Generator";

export type UserEntity = z.input<typeof UserEntity>;

export const UserEntity = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^[A-Za-z]\w{7,14}$/)
    .transform(toPasswordHash),
  role: z.nativeEnum(UserRole).default(UserRole.Admin),
  createdOn: z.date().default(() => new Date()),
  updatedOn: z.date().default(() => new Date()),
});
