import { Collection, Filter, ObjectId, OptionalId, WithId } from "mongodb";
import { z } from "zod";

import MongoDb from "./MongoDb";

const trash = MongoDb.db().collection("trash");

export default class DataManager<Schema extends z.ZodTypeAny> {
  private readonly _schema: Schema;
  private readonly _collection: Collection;

  constructor(name: string, schema: Schema) {
    this._schema = schema;
    this._collection = MongoDb.db().collection<z.infer<Schema>>(name);
  }

  get collection() {
    return this._collection as Collection<z.infer<Schema>>;
  }

  async find(filter: Filter<z.infer<Schema>>) {
    const schemaWithId = this._schema.and(z.object({ _id: z.instanceof(ObjectId) }));
    const ret: Array<WithId<z.infer<Schema>>> = [];
    const cursor = this._collection.find(filter as any);

    for await (const doc of cursor) {
      ret.push(schemaWithId.parse(doc));
    }

    return ret;
  }

  validateId(value: any) {
    if (value === undefined) return undefined;
    if (value["_id"] instanceof ObjectId) return value["_id"];
    if (value["_id"] instanceof String) return ObjectId.createFromHexString(value["_id"].toString());
    if (value instanceof ObjectId) return value;
    if (value instanceof String) return ObjectId.createFromHexString(value.toString());
  }

  validate(value: unknown): z.infer<Schema> {
    return this._schema.parse(value);
  }

  async get(id: string | ObjectId) {
    const dataId = this.validateId(id);

    if (dataId) {
      const result = await this._collection.findOne({ _id: dataId });

      if (result) {
        const schemaWithId = this._schema.and(z.object({ _id: z.instanceof(ObjectId) }));

        return schemaWithId.parse(result);
      }
    }
  }

  async insert(value: z.infer<Schema>) {
    const now = new Date();
    const data = this.validate(value);
    const result = await this._collection.insertOne({ ...data, createdOn: now, updatedOn: now });

    if (result.acknowledged) {
      return result.insertedId;
    }
  }

  async update(id: string | ObjectId, value: Partial<z.infer<Schema>>) {
    const dataId = this.validateId(id);
    const data = this._schema.optional().parse(value);
    const result = await this._collection.updateOne({ _id: dataId }, { $set: { ...data, updatedOn: new Date() } });

    if (result.acknowledged) {
      return dataId;
    }
  }

  async save(
    id: string | ObjectId | OptionalId<Partial<z.infer<Schema>>>,
    value?: OptionalId<Partial<z.infer<Schema>>>,
  ) {
    if (id instanceof ObjectId) {
      return this.update(id, value as Partial<z.infer<Schema>>);
    } else if (typeof id === "string") {
      return this.update(id, value as Partial<z.infer<Schema>>);
    } else if (id["_id"] instanceof ObjectId) {
      return this.update(id["_id"], value as Partial<z.infer<Schema>>);
    } else if (typeof id["_id"] === "string") {
      return this.update(id["_id"], value as Partial<z.infer<Schema>>);
    } else {
      return this.insert(value as z.infer<Schema>);
    }
  }

  async remove(id: string | ObjectId) {
    const dataId = this.validateId(id);
    const result = await this._collection.findOneAndDelete({ _id: dataId });

    if (!result) return false;

    trash
      .insertOne({ ...result, _id: `${this._collection.collectionName}::${dataId}` as any, deletedOn: new Date() })
      .catch();

    return true;
  }
}
