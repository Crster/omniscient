import { UserRole } from "../user-role/model";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface User extends IUser {
  userId: string;
}

export type UserDto = Omit<User, "password">;
