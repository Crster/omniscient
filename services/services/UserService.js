import { UserModel } from "../data/user";
import { DeleteError, ListingError, SavingError } from "../utilities/error";
import TrashService from "./TrashService";
import { newUserSchema } from "../schemas/newUserSchema";
import { setUserSchema } from "../schemas/setUserSchema";
import { userIdSchema } from "../schemas/userIdSchema";

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
    const input = newUserSchema.parse(newUser);

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
    const { inputId, ...input } = setUserSchema.parse({ userId, data });

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
    const inputId = userIdSchema.parse(userId);

    try {
      const user = await UserModel.findById(inputId).exec();
      await this._trashService.add(inputId, UserModel.name, user);

      await user.deleteOne();
      return user;
    } catch (err) {
      console.log(err);
      throw new DeleteError();
    }
  }
}
