import { ObjectId, WithId } from "mongodb";

import { IUser, User } from "./model";

import { openCollection } from "@/libraries/Database";

export class UserRepository {
  private _userCollection = openCollection<IUser>("users");

  private toUser(user: WithId<IUser> | null): User | undefined {
    if (user) {
      return {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        userId: user._id.toHexString(),
      };
    }
  }

  async getById(userId: string) {
    const result = await this._userCollection.findOne({ _id: ObjectId.createFromHexString(userId) });

    return this.toUser(result);
  }

  async getByEmail(email: string) {
    const result = await this._userCollection.findOne({ email });

    return this.toUser(result);
  }

  async getList(filter?: string) {
    const result: Array<User> = [];

    const cursor = filter
      ? this._userCollection.find({ email: { $regex: filter } })
      : this._userCollection.find({}, { limit: 1000 });

    for await (const item of cursor) {
      result.push(this.toUser(item) as User);
    }

    return result;
  }

  async count() {
    const result = await this._userCollection.countDocuments();

    return result;
  }

  async create(user: IUser) {
    const result = await this._userCollection.insertOne(user);

    if (result.acknowledged) {
      return result.insertedId.toHexString();
    }
  }

  async update(userId: string, update: Partial<IUser>) {
    const result = await this._userCollection.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      { $set: update },
    );

    return result.acknowledged;
  }

  async remove(userId: string) {
    const result = await this._userCollection.deleteOne({ _id: ObjectId.createFromHexString(userId) });

    return result.acknowledged;
  }
}
