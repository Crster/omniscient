"use server";

import { db } from "../utilities/database";
import getSession from "../utilities/session";
import AuthRepository from "../repositories/AuthRepository";
import { ApiResponse } from "../utilities/apiResponse";
import { NotFoundError, ZodError } from "../utilities/error";

export default async function login(formData) {
  const response = new ApiResponse();
  const authService = new AuthRepository();

  try {
    await db.connect();
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
