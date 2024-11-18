import { CalendarDate } from "@internationalized/date";
import { flatten, unflatten } from "flat";

export function toCalendar(date?: Date) {
  if (date) {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  } else {
    return new CalendarDate(2000, 1, 1);
  }
}

export function toDate(dateStr?: string) {
  return new Date(dateStr ?? "2000-01-01T00:00:00.000Z");
}

export function extractModified<T extends Record<string, any>>(oldValue: T, newValue: T, defaults?: Array<keyof T>) {
  const oldFlat = flatten<T, Record<string, any>>(oldValue, { maxDepth: 1 });
  const newFlat = flatten<T, Record<string, any>>(newValue, { maxDepth: 1 });

  const diff: Record<string, any> = {};
  const keys = Array.from(new Set([...Object.keys(oldFlat), ...Object.keys(newFlat)]));

  for (const key of keys) {
    // Check if there is a new value compared to old value
    if (newFlat[key] !== oldFlat[key]) {
      diff[key] = newFlat[key];
    }
    // Return the default value if no changes
    else if (defaults?.includes(key as keyof T)) {
      diff[key] = oldFlat[key];
    }
  }

  return unflatten<Record<string, any>, T>(diff);
}

export function fillDefault<T>(defaultValue: T, newValue: T) {
  const defaultFlat = flatten<T, Record<string, any>>(defaultValue, { maxDepth: 1 });
  const newFlat = flatten<T, Record<string, any>>(newValue, { maxDepth: 1 });

  const merge: Record<string, any> = {};
  const keys = Array.from(new Set([...Object.keys(defaultFlat), ...Object.keys(newFlat)]));

  for (const key of keys) {
    merge[key] = newFlat[key] ?? defaultFlat[key];
  }

  return unflatten<Record<string, any>, T>(merge);
}
