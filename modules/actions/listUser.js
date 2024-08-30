"use server";

import { isEmpty } from "lodash";
import getUserList from "../services/getUserList";
import { ActionResponse } from "../utilities/actionResponse";
import { ListingError } from "../utilities/error";
import connectDB from "../utilities/database";

export default async function listUser() {
  const response = new ActionResponse();

  try {
    await connectDB();
    const users = await getUserList();
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
