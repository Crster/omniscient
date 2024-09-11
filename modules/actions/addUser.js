"use server";

import connectDB from "../utilities/database";
import UserService from "../services/UserService";
import { ActionResponse } from "../utilities/actionResponse";
import { SavingError, ValidationError } from "../utilities/error";

export default async function addUser(newUser) {
  const response = new ActionResponse();
  const userService = new UserService();

  try {
    await connectDB();
    const user = await userService.addUser(newUser);

    response.data = userService.toResponse(user);
    response.success = true;
  } catch (err) {
    if (err instanceof SavingError) {
      response.error = "Failed to add user";
    } else if (err instanceof ValidationError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  }

  return response.toJson();
}
