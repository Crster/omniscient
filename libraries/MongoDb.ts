import { MongoClient } from "mongodb";

import { InternalServerError } from "./Error";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new InternalServerError("DATABASE_URL is not defined", { DATABASE_URL });
const MongoDb = new MongoClient(DATABASE_URL);

export default MongoDb;
