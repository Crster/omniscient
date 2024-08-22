import { UserModel } from "../models/user";
import { sha256 } from "../utilities/generator";
import { UserNotFoundError } from "../utilities/error";

export default async function loginByEmail(email, password) {
  const user = await UserModel.find({ email }).exec();

  if (!user) {
    throw new UserNotFoundError(email);
  }

  if (user.password !== sha256(password)) {
    throw new UserNotFoundError(email);
  }

  return user;
}
