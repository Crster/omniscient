import { createHash } from "crypto";

import { CalendarDate } from "@internationalized/date";

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
