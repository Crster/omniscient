"use server";

import { db } from "../utilities/database";
import UserRepository from "../repositories/UserRepository";
import { SavingError, ZodError } from "../utilities/error";
import { ApiResponse } from "../utilities/apiResponse";

export default async function editUser({ id, ...data }) {
  const response = new ApiResponse();
  const userService = new UserRepository();

  try {
    await db.connect();
    const user = await userService.updateUser(id, data);

    response.data = userService.toResponse(user);
    response.success = true;
  } catch (err) {
    if (err instanceof SavingError) {
      response.error = "Failed to edit user";
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
