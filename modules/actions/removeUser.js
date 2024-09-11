"use server";

import UserService from "../services/UserService";
import { ActionResponse } from "../utilities/actionResponse";
import connectDB from "../utilities/database";
import { DeleteError, ValidationError } from "../utilities/error";

export default async function removeUser({ id }) {
  const response = new ActionResponse();
  const userService = new UserService();

  try {
    await connectDB();
    const user = await userService.removeUser(id);

    response.data = userService.toResponse(user);
    response.success = true;
  } catch (err) {
    if (err instanceof DeleteError) {
      response.error = "Failed to remove user";
    } else if (err instanceof ValidationError) {
      response.error = err.message;
    } else {
      response.error = "Unknwon error";
    }
  }

  return response.toJson();
}
