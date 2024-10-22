import { ObjectId } from "mongodb";

import { UserEntity, UserSchema } from "./UserSchema";

import { User } from ".";

import MongoDb from "@/libraries/MongoDb";
import { InternalServerError, NotCreatedError, NotFoundError, NotModifiedError } from "@/libraries/Error";

const userCollection = MongoDb.db().collection<User>("users");

export async function hasUser() {
  const result = await userCollection.countDocuments();

  return result > 0;
}

export async function getList() {
  const result = await userCollection.find().toArray();

  return result.map((user) => UserEntity.parse({ ...user, userId: user._id.toHexString() }));
}

export async function getById(userId: string) {
  const result = await userCollection.findOne({ _id: ObjectId.createFromHexString(userId) });

  if (!result) throw new NotFoundError("User not found", { userId });

  return UserEntity.parse({ ...result, userId: result._id.toHexString() });
}

export async function getByCredential(email: string, password: string) {
  const result = await userCollection.findOne({ email, password });

  if (!result) throw new NotFoundError("User not found", { email });

  return UserEntity.parse({ ...result, userId: result._id.toHexString() });
}

export async function create(user: User) {
  if (!user.password) throw new InternalServerError("Password is required");

  const result = await userCollection.insertOne(UserSchema.parse(user));

  if (result && result.acknowledged) {
    return result.insertedId.toHexString();
  }

  throw new NotCreatedError("Failed to create user", { result });
}

export async function update(userId: string, user: User) {
  const result = await userCollection.updateOne(
    { _id: ObjectId.createFromHexString(userId) },
    { $set: UserSchema.optional().parse(user) },
  );

  if (result && result.acknowledged) {
    return result.modifiedCount > 0;
  }

  throw new NotModifiedError("Failed to update user", { result });
}

export async function remove(userId: string) {
  const result = await userCollection.findOneAndDelete({ _id: ObjectId.createFromHexString(userId) });

  if (!result) throw new NotFoundError("User not found", { userId });

  return UserEntity.parse({ ...result, userId: result._id.toHexString() });
}
