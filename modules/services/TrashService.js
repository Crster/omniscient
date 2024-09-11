import { TrashModel } from "../models/trash";

export default class TrashService {
  async add(id, type, data) {
    try {
      await TrashModel.create({
        _id: id,
        type,
        data,
      });

      return true;
    } catch (err) {
      console.warn(`Trash: not created ${JSON.stringify({ id, type, data })}`);
    }

    return false;
  }
}
