import { z } from "zod";

import { toObjectId } from "@/libraries/Generator";

export type TrashEntity = z.input<typeof TrashEntity>;

export const TrashEntity = z.object({
  entityType: z.enum(["users", "candidates"]),
  entityId: z.string().transform(toObjectId),
  entity: z.record(z.string(), z.any()),
  deletedBy: z.string().transform(toObjectId),
  deletedOn: z.date().default(() => new Date()),
});
