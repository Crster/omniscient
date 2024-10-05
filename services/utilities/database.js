import { MongoClient } from "mongodb";
import { appConfig } from "../data/app-config";

const dbClient = new MongoClient(appConfig.database.url);

export const db = {
  connect: async () => await dbClient.connect(),
  disconnect: async () => await dbClient.close(),
  user: dbClient.db().collection("users"),
  trash: dbClient.db().collection("trashes"),
  voter: dbClient.db().collection("voters")
};

