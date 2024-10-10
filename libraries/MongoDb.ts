import { FindCursor, MongoClient, WithId } from "mongodb";
import { z } from "zod";

import { InvalidConfigurationError } from "./Error";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new InvalidConfigurationError("DATABASE_URL is not defined", { DATABASE_URL });
export default new MongoClient(DATABASE_URL);

export const filterDto = z.object({
  sort: z
    .object({
      field: z.string(),
      order: z.enum(["asc", "desc"]).optional(),
    })
    .optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
});

export function processFilterDto<Schema>(cursor: FindCursor<WithId<Schema>>, filter: z.infer<typeof filterDto>) {
  if (filter.sort) {
    cursor.sort(filter.sort.field, filter.sort.order);
  }

  if (filter.skip) {
    cursor.skip(filter.skip);
  }

  if (filter.limit) {
    cursor.limit(filter.limit);
  }

  return cursor.toArray();
}

export const newValueDto = z.object({
  createdOn: z
    .date()
    .optional()
    .default(() => new Date()),
  modifiedOn: z
    .date()
    .optional()
    .default(() => new Date()),
});

export const updatedValueDto = z.object({
  modifiedOn: z
    .date()
    .optional()
    .default(() => new Date()),
});
