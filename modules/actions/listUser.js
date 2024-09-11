"use server";

import { isEmpty } from "lodash";
import connectDB from "../utilities/database";
import { ListingError } from "../utilities/error";
import UserService from "../services/UserService";
import { ActionResponse } from "../utilities/actionResponse";

export default async function listUser() {
  const response = new ActionResponse();
  const userService = new UserService();

  try {
    await connectDB();
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
  }

  return response.toJson();
}
