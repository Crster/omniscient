"use server";

import { isEmpty } from "lodash";
import { ActionResponse } from "../utilities/actionResponse";
import { ListingError } from "../utilities/error";
import connectDB from "../utilities/database";
import UserService from "../services/UserService";

export default async function listUser() {
  const response = new ActionResponse();
  const userService = new UserService();

  try {
    await connectDB();
    const users = await userService.getUsers();
    if (!isEmpty(users)) {
      response.data = users.map((ii) => ({
        rowId: ii.id,
        name: ii.name,
        email: ii.email,
        role: ii.role,
      }));
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
