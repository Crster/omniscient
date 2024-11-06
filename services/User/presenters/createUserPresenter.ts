import { User, UserDto } from "../model";

export function createUserPrenter(user: User): UserDto {
  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
