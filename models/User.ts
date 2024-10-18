import { z } from "zod";
import { ObjectId, OptionalId } from "mongodb";

import { UserRole } from "./UserRole";

import DataManager from "@/libraries/DataManager";
import { NotCreatedError } from "@/libraries/Error";
import { passwordHash } from "@/libraries/Generator";

const userManager = new DataManager(
  "users",
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().length(64),
    role: z.nativeEnum(UserRole),
  }),
);

export type User = ReturnType<typeof userManager.validate>;

export const User = {
  collection: userManager.collection,
  removePassword(user: User) {
    const { password, ...rest } = user;

    if (password) {
      return rest;
    }

    return rest;
  },
  async initAdminAccount(email: string, password: string) {
    let adminId: ObjectId | undefined;
    const userCount = await userManager.collection.countDocuments();

    if (userCount === 0) {
      adminId = await userManager.insert({
        name: "System Admin",
        email: email,
        password: passwordHash(password),
        role: UserRole.Admin,
      });
    }

    if (!adminId) throw new NotCreatedError("Failed to initialize admin account", { adminId });

    return await userManager.get(adminId);
  },
  async getById(userId: string) {
    return await userManager.get(userId);
  },
  async getByCredential(email: string, password: string) {
    const users = await userManager.find({ email, password: passwordHash(password) });

    return users?.at(0);
  },
  async save(user: OptionalId<User>) {
    if (user.password) {
      user.password = passwordHash(user.password);
    }

    return await userManager.save(user);
  },
  async remove(userId: string) {
    return await userManager.remove(userId);
  },
};
