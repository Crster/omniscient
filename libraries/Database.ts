import { Document, MongoClient } from "mongodb";

import { InternalServerError } from "./Error";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new InternalServerError("DATABASE_URL is not defined", { DATABASE_URL });
const mongoClient = new MongoClient(DATABASE_URL);

export function connectToDatabase() {
  return mongoClient.connect();
}

export function disconnectFromDatabase() {
  return mongoClient.close();
}

export function openCollection<TSchema extends Document = Document>(collectionName: string) {
  return mongoClient.db().collection<TSchema>(collectionName);
}
