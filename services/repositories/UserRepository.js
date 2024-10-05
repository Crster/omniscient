import { DeleteError, ListingError, SavingError } from "../utilities/error";
import { db } from "../utilities/database";
import { newUserSchema, updateUserSchema, userIdSchema } from "../schemas/userSchema";

export default class UserRepository {
  async getUser(userId) {
    const inputId = userIdSchema.parse(userId);

    const user = await db.user.findOne({ _id: inputId });
    return user;
  }

  async addUser(newUser) {
    const input = newUserSchema.parse(newUser);

    try {
      const result = await db.user.insertOne(input);
      return this.getUser(result.insertedId);
    } catch {
      throw new SavingError();
    }
  }

  async getUsers() {
    try {
      const users = await db.user.find();
      return users;
    } catch {
      throw new ListingError();
    }
  }

  async updateUser(userId, data) {
    const { inputId, ...input } = updateUserSchema.parse({ userId, data });

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
