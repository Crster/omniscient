import { ObjectId } from "mongodb";

import { UserEntity } from "./UserEntity";

import MongoDb from "@/libraries/MongoDb";
import { User } from "@/services/User/User";
import { InternalServerError, NotCreatedError, NotFoundError, NotModifiedError } from "@/libraries/Error";

export class UserRepository {
  private userCollection = MongoDb.db().collection<UserEntity>("users");

  async hasUser() {
    const result = await this.userCollection.countDocuments();

    return result > 0;
  }

  async getById(userId: string) {
    const data = await this.userCollection.findOne({ _id: ObjectId.createFromHexString(userId) });

    if (!data) throw new NotFoundError("User not found", { userId });

    return User.fromRepository(data);
  }

  async getByCredential(email: string, password: string) {
    const data = await this.userCollection.findOne({ email, password });

    if (!data) throw new NotFoundError("User not found", { email });

    return User.fromRepository(data);
  }

  async create(user: User) {
    if (!user.password) throw new InternalServerError("Password is required");

    const result = await this.userCollection.insertOne(user.toEntity());

    if (result && result.acknowledged) {
      return result.insertedId.toHexString();
    }

    throw new NotCreatedError("Failed to create user", { result });
  }

  async update(user: User) {
    if (!user.userId) throw new InternalServerError("User ID is required");

    const result = await this.userCollection.updateOne(
      { _id: ObjectId.createFromHexString(user.userId) },
      { $set: user.toEntity() },
    );

    if (result && result.acknowledged) {
      return result.modifiedCount > 0;
    }

    throw new NotModifiedError("Failed to update user", { result });
  }

  async remove(userId: string) {
    const result = await this.userCollection.findOneAndDelete({ _id: ObjectId.createFromHexString(userId) });

    if (!result) throw new NotFoundError("User not found", { userId });

    return User.fromRepository(result);
  }
}
