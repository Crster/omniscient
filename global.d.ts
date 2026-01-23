import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var dbClient: MongoClient;
  }
}
