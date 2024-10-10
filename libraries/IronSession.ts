import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import { InvalidConfigurationError } from "./Error";

export interface SessionData {
  user?: string;
}

export default async function getSession(req: NextRequest | NextApiRequest, res: NextResponse | NextApiResponse) {
  const SESSION_KEY = process.env.SESSION_KEY;

  if (!SESSION_KEY) throw new InvalidConfigurationError("SESSION_KEY is not defined", { SESSION_KEY });

  const session = await getIronSession<SessionData>(req, res, {
    cookieName: process.env.SESSION_NAME || "auth-session",
    password: SESSION_KEY,
    ttl: 86400,
  });

  return session;
}
