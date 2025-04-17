import { prisma } from "@/prisma/prisma";
import { User } from "./user.model";

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
