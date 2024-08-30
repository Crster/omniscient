import { UserModel } from "../models/user";
import { ListingError } from "../utilities/error";

export default async function getUserList() {
  try {
    const users = await UserModel.find({}).exec();
    return users;
  } catch {
    throw new ListingError();
  }
}
