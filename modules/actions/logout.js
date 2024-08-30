"use server";

import { redirect } from "next/navigation";
import getSession from "../utilities/session";

export default async function logout() {
  const session = await getSession();
  session.destroy();

  return redirect("/");
}
