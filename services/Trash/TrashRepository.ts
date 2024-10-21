import { Trash } from "./Trash";
import { TrashEntity } from "./TrashEntity";

import { NotCreatedError } from "@/libraries/Error";
import MongoDb from "@/libraries/MongoDb";

export class TrashRepository {
  private trashCollection = MongoDb.db().collection<TrashEntity>("trash");

  async create(trash: Trash) {
    const result = await this.trashCollection.insertOne({ ...trash.toEntity(), _id: trash.trashId } as any);

    if (result && result.acknowledged) {
      return result.insertedId.toHexString();
    }

    throw new NotCreatedError("Failed to backup " + trash.trashId, { result });
  }
}
