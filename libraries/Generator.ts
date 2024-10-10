import { createHash } from "crypto";

export function passwordHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
