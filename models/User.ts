import { z } from "zod";
import { OptionalId } from "mongodb";

import { UserRole } from "./UserRole";

import DataManager from "@/libraries/DataManager";

const userManager = new DataManager(
  "users",
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().length(32),
    role: z.nativeEnum(UserRole),
  }),
);

export type User = ReturnType<typeof userManager.validate>;

export const User = {
  collection: userManager.collection,
  async getByCredential(email: string, password: string) {
    const users = await userManager.find({ email, password });

    return users?.at(0);
  },
  async save(user: OptionalId<User>) {
    return await userManager.save(user);
  },
  async remove(userId: string) {
    return await userManager.remove(userId);
  },
};
