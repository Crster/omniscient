"use server";

import loginByEmail from "../services/loginByEmail";
import connectDB from "../utilities/database";
import getSession from "../utilities/session";
import { UserNotFoundError, ValidationError } from "../utilities/error";
import { ActionResponse } from "../utilities/actionResponse";

export default async function login(formData) {
  const response = new ActionResponse();

  try {
    await connectDB();
    const user = await loginByEmail(
      formData.get("email"),
      formData.get("password")
    );

    const session = await getSession();
    session.user = user.id;
    await session.save();

    response.success = true;
    response.data = {
      user: {
        name: user.name,
        role: user.role,
      },
      redirect: "/",
    };
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      response.error = "User not found";
    } else if (err instanceof ValidationError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  }

  return response.toJson();
}
