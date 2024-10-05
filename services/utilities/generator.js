import { createHash } from "crypto";
import * as uuid from "uuid";

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function hashId(value, secret = "630bd2f4-d8d1-4149-ad2d-977b0ac66476") {
  return uuid.v5(value, secret);
}

