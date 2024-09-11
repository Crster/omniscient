"use server";

import connectDB from "../utilities/database";
import getSession from "../utilities/session";
import AuthService from "../services/AuthService";
import { ActionResponse } from "../utilities/actionResponse";
import { NotFoundError, ValidationError } from "../utilities/error";

export default async function login(formData) {
  const response = new ActionResponse();
  const authService = new AuthService();

  try {
    await connectDB();
    const user = await authService.login({
      email: formData.get("email"),
      password: formData.get("password"),
    });

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
    if (err instanceof NotFoundError) {
      response.error = "User not found";
    } else if (err instanceof ValidationError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  }

  return response.toJson();
}
