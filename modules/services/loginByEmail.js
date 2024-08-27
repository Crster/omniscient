import Joi from "joi";
import { UserModel } from "../models/user";
import { sha256 } from "../utilities/generator";
import { UserNotFoundError } from "../utilities/error";

const inputSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(4),
});

export default async function loginByEmail(email, password) {
  const input = await inputSchema.validateAsync({ email, password })
  const user = await UserModel.findOne({ email: input.email }).exec();

  if (!user) {
    throw new UserNotFoundError(email);
  }

  if (user.password !== sha256(input.password)) {
    throw new UserNotFoundError(email);
  }

  return user;
}
