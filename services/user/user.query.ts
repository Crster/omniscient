import { User } from "./user.model";
import { prisma } from "@/prisma/prisma";

export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return users;
}
