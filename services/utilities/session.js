import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default async function getSession() {
  const session = await getIronSession(cookies(), {
    cookieName: process.env.SESSION_NAME,
    password: process.env.SESSION_KEY,
    ttl: 86400,
  });

  return session;
}
