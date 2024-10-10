export enum UserRoles {
  Admin = "ADMIN",
  Validator = "VALIDATOR",
  Surveyor = "SURVEYOR",
}

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
}
