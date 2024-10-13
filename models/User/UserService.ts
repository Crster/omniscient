import { FindCursor, ObjectId, WithId } from "mongodb";

import { UserSchema } from "./UserSchema";
import {
  LoginDto,
  ModifiedUser,
  ModifiedUserDto,
  NewUser,
  NewUserDto,
  UserDto,
  UserFilter,
  UserFilterDto,
} from "./UserDto";

import MongoDb, { processFilterDto } from "@/libraries/MongoDb";
import { removeEmptyString } from "@/libraries/Generator";

export default class UserService {
  private readonly userCollection = MongoDb.db().collection<UserSchema>("users");

  async getById(userId: string) {
    return await this.userCollection.findOne({ _id: ObjectId.createFromHexString(userId) });
  }

  async getByEmail(email: string, password: string) {
    const loginDto = LoginDto.parse(removeEmptyString({ email, password }));

    return await this.userCollection.findOne(loginDto);
  }

  async getList(filter: UserFilter) {
    const filterDto = UserFilterDto.parse(filter);

    let cursor: FindCursor;

    if (filterDto?.email) {
      cursor = this.userCollection.find({ email: { $regex: filterDto.email, $options: "i" } });
    } else if (filterDto?.name) {
      cursor = this.userCollection.find({ name: { $regex: filterDto.name, $options: "i" } });
    } else if (filterDto?.role) {
      cursor = this.userCollection.find({ role: filterDto.role });
    } else {
      cursor = this.userCollection.find();
    }

    return await processFilterDto<UserSchema>(cursor, filter);
  }

  toUserDto(user: WithId<UserSchema>): UserDto {
    return {
      userId: user._id?.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  toListUserDto(users: WithId<UserSchema>[]): UserDto[] {
    return users.map((user) => this.toUserDto(user));
  }

  async create(data: NewUser) {
    const newUser = NewUserDto.parse(removeEmptyString(data));

    const user: UserSchema = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    };

    const result = await this.userCollection.insertOne(user);

    return result.insertedId.toString();
  }

  async update(userId: string, data: ModifiedUser) {
    const modifiedUser = ModifiedUserDto.parse(removeEmptyString(data));

    const result = await this.userCollection.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      { $set: modifiedUser },
    );

    return result.modifiedCount > 0;
  }

  async remove(userId: string) {
    const result = await this.userCollection.findOneAndDelete({ _id: ObjectId.createFromHexString(userId) });

    return result;
  }
}
