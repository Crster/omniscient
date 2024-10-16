import { Collection, Document, Filter, ObjectId, OptionalId, WithId } from "mongodb";
import { z } from "zod";

import MongoDb from "./MongoDb";

const trash = MongoDb.db().collection("trash");

export default class Model<Schema extends z.ZodTypeAny> {
  private readonly _schema: Schema;
  private readonly _collection: Collection;

  constructor(name: string, schema: Schema) {
    this._schema = schema;
    this._collection = MongoDb.db().collection<z.infer<Schema>>(name);
  }

  get collection() {
    return this._collection as Collection<z.infer<Schema>>;
  }

  async find(filter: Filter<Document>) {
    return await this._collection.findOne(filter);
  }

  getId(value: any) {
    if (value === undefined) return undefined;
    if (value["_id"] instanceof ObjectId) return value["_id"];
    if (value["_id"] instanceof String) return ObjectId.createFromHexString(value["_id"].toString());
    if (value instanceof ObjectId) return value;
    if (value instanceof String) return ObjectId.createFromHexString(value.toString());
  }

  create(value: unknown): z.infer<Schema> {
    return this._schema.parse(value);
  }

  createWithId(value: unknown): WithId<z.infer<Schema>> {
    const userId = this.getId(value);
    const data = this.create(value);

    return { _id: userId, ...data };
  }

  async get(id: ObjectId | string) {
    const valueId = this.getId(id);

    if (valueId) {
      const result = await this._collection.findOne({ _id: valueId });

      if (result) return this.createWithId(result);
    }
  }

  async save(value: OptionalId<z.infer<Schema>>) {
    const now = new Date();
    const modelId = this.getId(value);
    const data = this.create(value);

    if (modelId) {
      const result = await this._collection.updateOne({ _id: modelId }, { $set: { ...data, updatedOn: now } });

      if (result.acknowledged) {
        return modelId;
      }
    } else {
      const result = await this._collection.insertOne({ ...data, createdOn: now, updatedOn: now });

      if (result.acknowledged) {
        return result.insertedId;
      }
    }
  }

  async remove(value: WithId<z.infer<Schema>>) {
    const modelId = this.getId(value);
    const result = await this._collection.deleteOne({ _id: modelId });

    trash
      .insertOne({ ...value, _id: `${this._collection.collectionName}::${modelId}` as any, deletedOn: new Date() })
      .catch();

    return result.deletedCount > 0;
  }
}
