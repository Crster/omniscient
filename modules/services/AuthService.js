import Joi from "joi";
import { UserModel } from "../models/user";
import { NotFoundError } from "../utilities/error";
import { sha256 } from "../utilities/generator";

export default class AuthService {
  async login(credential) {
    const input = await Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }).validateAsync(credential);

    const user = await UserModel.findOne({ email: input.email }).exec();
    if (!user) {
      throw new NotFoundError(email);
    }
    if (user.password !== sha256(input.password)) {
      throw new NotFoundError(email);
    }

    return user;
  }
}
