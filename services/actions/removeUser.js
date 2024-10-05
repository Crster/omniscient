"use server";

import UserRepository from "../repositories/UserRepository";
import { ApiResponse } from "../utilities/apiResponse";
import { db } from "../utilities/database";
import { DeleteError, ZodError } from "../utilities/error";

export default async function removeUser({ id }) {
  const response = new ApiResponse();
  const userService = new UserRepository();

  try {
    await db.connect();
    const user = await userService.removeUser(id);

    response.data = userService.toResponse(user);
    response.success = true;
  } catch (err) {
    if (err instanceof DeleteError) {
      response.error = "Failed to remove user";
    } else if (err instanceof ZodError) {
      response.error = err.message;
    } else {
      response.error = "Unknwon error";
    }
  } finally {
    await db.disconnect();
  }

  return response.toJson();
}
