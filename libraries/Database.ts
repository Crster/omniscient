import { MongoClient } from "mongodb";

import { InternalServerError } from "./Error";

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) throw new InternalServerError("DATABASE_URL is not defined");

export async function getDbClient() {
  if (!global.dbClient) {
    global.dbClient = await MongoClient.connect(DATABASE_URL);
  }

  return global.dbClient;
}
