import { Document, Filter, ObjectId, OptionalUnlessRequiredId, WithId } from "mongodb";

import { getDbClient } from "./Database";

export type TransformCallback<Model, IModel extends Document = Document> = (
  model: WithId<IModel> | null,
) => Model | undefined;

export abstract class BaseRepository<Model, IModel extends Document = Document> {
  private readonly collectionName: string;
  protected readonly transform: TransformCallback<Model, IModel>;

  constructor(collectionName: string, formatter: TransformCallback<Model, IModel>) {
    this.collectionName = collectionName;
    this.transform = formatter;
  }

  protected async getCollection() {
    const client = await getDbClient();

    return client.db().collection<IModel>(this.collectionName);
  }

  async hasItem() {
    const collection = await this.getCollection();
    const result = await collection.findOne();

    return !!result;
  }

  async getById(id: string) {
    const collection = await this.getCollection();
    const result = await collection.findOne({ _id: ObjectId.createFromHexString(id) } as any);

    return this.transform(result);
  }

  async getList(filter?: Filter<Document>) {
    const result: Array<Model> = [];
    const collection = await this.getCollection();

    const cursor = filter ? collection.find(filter, { limit: 1000 }) : collection.find({}, { limit: 1000 });

    while (await cursor.hasNext()) {
      const document = await cursor.next();
      const model = this.transform(document);

      if (model) result.push(model);
    }

    return result;
  }

  async create(model: OptionalUnlessRequiredId<IModel>) {
    const collection = await this.getCollection();
    const result = await collection.insertOne(model);

    if (result.acknowledged) {
      return result.insertedId.toHexString();
    }
  }

  async update(id: string, model: Partial<IModel>) {
    const collection = await this.getCollection();
    const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) } as any, { $set: model });

    if (result.acknowledged) {
      return result.modifiedCount > 0;
    }
  }

  async remove(id: string) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) } as any);

    if (result.acknowledged) {
      return result.deletedCount > 0;
    }
  }
}
