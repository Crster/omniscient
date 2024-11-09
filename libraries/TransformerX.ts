import { createHash } from "crypto";

import { ObjectId } from "mongodb";

export function toPasswordHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function toObjectId(value: string) {
  return ObjectId.createFromHexString(value);
}

export function toHexString(value: ObjectId) {
  return value.toHexString();
}
