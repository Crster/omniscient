"use server";

import { isEmpty } from "lodash";
import { db } from "../utilities/database";
import { ListingError } from "../utilities/error";
import UserRepository from "../repositories/UserRepository";
import { ApiResponse } from "../utilities/apiResponse";

export default async function listUser() {
  const response = new ApiResponse();
  const userService = new UserRepository();

  try {
    await db.connect();
    const users = await userService.getUsers();
    if (!isEmpty(users)) {
      response.data = users.map((ii) => userService.toResponse(ii));
    }

    response.success = true;
  } catch (err) {
    if (err instanceof ListingError) {
      response.error = "Failed to load user";
    } else {
      response.error = "Unknown error";
    }
  } finally {
    await db.disconnect();
  }

  return response.toJson();
}
