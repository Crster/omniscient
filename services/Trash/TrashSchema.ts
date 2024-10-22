import { z } from "zod";

import { toObjectId } from "@/libraries/Generator";

export const TrashSchema = z.object({
  entityType: z.enum(["users", "candidates"]),
  entityId: z.string().transform(toObjectId),
  entity: z.record(z.string(), z.any()),
  deletedBy: z.string().transform(toObjectId),
  deletedOn: z.date().default(() => new Date()),
});

export const TrashEntity = TrashSchema.extend({
  trashId: z.string().optional(),
});
