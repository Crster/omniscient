import { z } from "zod";
import { OptionalId, WithId } from "mongodb";

import { UserRole } from "./UserRole";

import Model from "@/libraries/Model";

const userModel = new Model(
  "users",
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().length(32),
    role: z.nativeEnum(UserRole),
  }),
);

export type User = ReturnType<typeof userModel.create>;

export const User = {
  collection: userModel.collection,
  async getByCredential(email: string, password: string) {
    return await userModel.find({ email, password });
  },
  async save(user: OptionalId<User>) {
    return await userModel.save(user);
  },
  async remove(user: WithId<User>) {
    return await userModel.remove(user);
  },
};
