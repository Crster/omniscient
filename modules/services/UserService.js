import Joi from "joi";
import { UserModel } from "../models/user";
import { ListingError, SavingError } from "../utilities/error";

export default class UserService {
  async addUser(newUser) {
    const input = await Joi.object({
      name: Joi.string().required().min(6),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      role: Joi.string().valid("admin", "surveyor", "validator"),
    }).validateAsync(newUser);

    try {
      const user = new UserModel(input);
      return await user.save();
    } catch {
      throw new SavingError();
    }
  }

  async getUsers() {
    try {
      const users = await UserModel.find({}).exec();
      return users;
    } catch {
      throw new ListingError();
    }
  }
}
