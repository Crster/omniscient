import { createHash } from "crypto";

import { CalendarDate } from "@internationalized/date";
import { flatten, unflatten } from "flat";

export function passwordHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function toCalendar(date?: Date) {
  if (date) {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  } else {
    return new CalendarDate(2000, 1, 1);
  }
}

export function removeEmptyString<T>(value: T) {
  const sanitized: Map<string, any> = new Map();
  const flat = flatten<T, Record<string, any>>(value);

  for (const key in flat) {
    if (flat[key] === undefined) {
      continue;
    }

    if (flat[key] === null) {
      continue;
    }

    if (typeof flat[key] === "string" && flat[key].trim() === "") {
      continue;
    }

    sanitized.set(key, flat[key]);
  }

  return unflatten<Record<string, any>, T>(Object.fromEntries(sanitized));
}
