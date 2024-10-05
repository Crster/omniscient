import { db } from "../utilities/database";

export default class TrashRepository {
  async add(type, typeId, data) {
    try {
      await db.trash.insertOne({ _id: hashId(`${type}:${typeId}`), type, data });
      return true;
    } catch (err) {
      console.warn(`Trash: not created ${JSON.stringify({ id, type, data })}`);
    }

    return false;
  }
}
