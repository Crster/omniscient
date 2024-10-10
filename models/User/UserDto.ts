import { z } from "zod";

import { UserRoles } from "./UserSchema";

import { filterDto, newValueDto, updatedValueDto } from "@/libraries/MongoDb";
import { passwordHash } from "@/libraries/Generator";

export type UserFilter = z.infer<typeof UserFilterDto>;
export type NewUser = z.infer<typeof NewUserDto>;
export type ModifiedUser = z.infer<typeof ModifiedUserDto>;

export interface UserDto {
  userId: string;
  name: string;
  email: string;
  role: UserRoles;
}

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().transform(passwordHash),
});

export const UserFilterDto = z
  .object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    role: z.nativeEnum(UserRoles).optional(),
  })
  .merge(filterDto);

export const NewUserDto = z
  .object({
    email: z.string().email(),
    password: z.string().refine((val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val), {
      message: "Password is not strong",
    }),
    name: z.string(),
    role: z.nativeEnum(UserRoles),
  })
  .merge(newValueDto);

export const ModifiedUserDto = z
  .object({
    password: z
      .string()
      .refine((val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val), {
        message: "Password is not strong",
      })
      .optional(),
    name: z.string().optional(),
    role: z.nativeEnum(UserRoles).optional(),
  })
  .merge(updatedValueDto);
