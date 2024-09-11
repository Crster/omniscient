import { createHash } from "crypto";
import mongoose from "mongoose";

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function objectId(value) {
  return mongoose.Types.ObjectId.createFromHexString(value);
}
