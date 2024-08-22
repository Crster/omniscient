"use server";

import { redirect } from "next/navigation";
import loginByEmail from "../services/loginByEmail";
import connectDB from "../utilities/database";
import { UserNotFoundError } from "../utilities/error";
import getSession from "../utilities/session";

export default async function login(prevState, formData) {
  try {
    await connectDB();
    const user = await loginByEmail(
      formData.get("email"),
      formData.get("password")
    );

    const session = await getSession();
    session.user = user._id;
    await session.save();

    redirect("/");
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return { message: "User not found" };
    } else {
      return { message: "Unknown error" };
    }
  }
}
