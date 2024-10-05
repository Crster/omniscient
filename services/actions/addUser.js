"use server";

import { db } from "../utilities/database";
import UserRepository from "../repositories/UserRepository";
import { ApiResponse } from "../utilities/apiResponse";
import { SavingError, ZodError } from "../utilities/error";

export default async function addUser(newUser) {
  const response = new ApiResponse();
  const userService = new UserRepository();

  try {
    await db.connect();
    const user = await userService.addUser(newUser);

    response.data = userService.toResponse(user);
    response.success = true;
  } catch (err) {
    if (err instanceof SavingError) {
      response.error = "Failed to add user";
    } else if (err instanceof ZodError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  } finally {
    await db.disconnect();
  }

  return response.toJson();
}
