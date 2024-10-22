import { Trash } from "./Trash";
import { TrashSchema } from "./TrashSchema";

import { NotCreatedError } from "@/libraries/Error";
import MongoDb from "@/libraries/MongoDb";

const trashCollection = MongoDb.db().collection<Trash>("trash");

export async function create(trash: Trash) {
  const result = await trashCollection.insertOne({
    ...TrashSchema.parse(trash),
    _id: `${trash.entityType}::${trash.entityId}`,
  } as any);

  if (result && result.acknowledged) {
    return result.insertedId.toHexString();
  }

  throw new NotCreatedError("Failed to backup " + trash.trashId, { result });
}
