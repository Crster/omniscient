import Joi from "joi";
import { UserModel } from "../models/user";
import { DeleteError, ListingError, SavingError } from "../utilities/error";
import { objectId, sha256 } from "../utilities/generator";
import { TrashModel } from "../models/trash";
import TrashService from "./TrashService";

export default class UserService {
  _trashService = new TrashService();

  toResponse(user) {
    if (user) {
      return {
        rowId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
  }

  async addUser(newUser) {
    const input = await Joi.object({
      name: Joi.string().required().min(6),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .custom(sha256),
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

  async updateUser(userId, data) {
    const inputId = await Joi.string()
      .required()
      .hex()
      .length(24)
      .custom(objectId)
      .validateAsync(userId);

    const input = await Joi.object({
      name: Joi.string().min(6),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .custom(sha256),
      role: Joi.string().valid("admin", "surveyor", "validator"),
    }).validateAsync(data);

    try {
      const user = await UserModel.findOne({ _id: inputId }).exec();

      if (input.name) {
        user.name = input.name;
      }

      if (input.password) {
        user.password = input.password;
      }

      if (input.role) {
        user.role = input.role;
      }

      return await user.save();
    } catch {
      throw new SavingError();
    }
  }

  async removeUser(userId) {
    const inputId = await Joi.string()
      .required()
      .hex()
      .length(24)
      .custom(objectId)
      .validateAsync(userId);

    try {
      const user = await UserModel.findOne({ _id: inputId }).exec();
      await this._trashService.add(inputId, UserModel.name, user);

      return await user.remove();
    } catch {
      throw new DeleteError();
    }
  }
}
