"use server";

import UserService from "../services/UserService";
import { ActionResponse } from "../utilities/actionResponse";
import connectDB from "../utilities/database";
import { ListingError, ValidationError } from "../utilities/error";

export default async function addUser(newUser) {
  const response = new ActionResponse();
  const userService = new UserService();

  try {
    await connectDB();
    const user = await userService.addUser(newUser);

    response.data = {
      rowId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    response.success = true;
  } catch (err) {
    if (err instanceof ListingError) {
      response.error = "Failed to load user";
    } else if (err instanceof ValidationError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  }

  return response.toJson();
}
