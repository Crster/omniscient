import { WithId } from "mongodb";

import { UserEntity } from "./UserEntity";

import { UserRole } from "@/services/Data/UserRole";
import { OnlyRequired } from "@/libraries/OnlyRequired";

export class User {
  private readonly _value = new Map<string, any>();

  public static fromRepository(entity: WithId<UserEntity>) {
    const user = new User();

    user._value.set("userId", entity._id.toString());
    user._value.set("name", entity.name);
    user._value.set("email", entity.email);
    user._value.set("password", entity.password);
    user._value.set("role", entity.role);

    return user;
  }

  constructor(value?: OnlyRequired<UserEntity>) {
    if (value) {
      this.name = value.name;
      this.email = value.email;
      this.password = value.password;
    }
  }

  get userId(): string | undefined {
    return this._value.get("userId");
  }

  get name(): string {
    return this._value.get("name");
  }

  set name(value: string) {
    this._value.set("name", UserEntity.shape.name.parse(value));
  }

  get email(): string {
    return this._value.get("email");
  }

  set email(value: string) {
    this._value.set("email", UserEntity.shape.email.parse(value));
  }

  get password(): string {
    return this._value.get("password");
  }

  set password(value: string) {
    this._value.set("password", UserEntity.shape.password.parse(value));
  }

  get role(): UserRole {
    return this._value.get("role");
  }

  set role(value: UserRole) {
    this._value.set("role", UserEntity.shape.role.parse(value));
  }

  toEntity() {
    return UserEntity.parse(this._value);
  }
}
