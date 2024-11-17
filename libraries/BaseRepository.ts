import { Document, Filter, ObjectId, WithId } from "mongodb";

import { getDbClient } from "./Database";

export type ModelTransformer<ModelId extends string = "_id", Model extends Document = Document> = (
  model: WithId<Document> | null,
) => (Model & { [K in ModelId]: string }) | undefined;

export abstract class BaseRepository<ModelId extends string = "_id", Model extends Document = Document> {
  private readonly collectionName: string;
  protected readonly transform: ModelTransformer<ModelId, Model>;

  constructor(collectionName: string, formatter: ModelTransformer<ModelId, Model>) {
    this.collectionName = collectionName;
    this.transform = formatter;
  }

  protected async getCollection() {
    const client = await getDbClient();

    return client.db().collection(this.collectionName);
  }

  async hasItem() {
    const collection = await this.getCollection();
    const result = await collection.findOne();

    return !!result;
  }

  async getById(id: string) {
    const collection = await this.getCollection();
    const result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

    return this.transform(result);
  }

  async getList(filter?: Filter<Document>) {
    const result: Array<Model & { [K in ModelId]: string }> = [];
    const collection = await this.getCollection();

    const cursor = filter ? collection.find(filter, { limit: 1000 }) : collection.find({}, { limit: 1000 });

    while (await cursor.hasNext()) {
      const document = await cursor.next();
      const model = this.transform(document);

      if (model) result.push(model);
    }

    return result;
  }

  async create(model: Model) {
    const collection = await this.getCollection();
    const result = await collection.insertOne(model);

    if (result.acknowledged) {
      return result.insertedId.toHexString();
    }
  }

  async update(id: string, model: Partial<Model>) {
    const collection = await this.getCollection();
    const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: model });

    if (result.acknowledged) {
      return result.modifiedCount > 0;
    }
  }

  async remove(id: string) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });

    if (result.acknowledged) {
      return result.deletedCount > 0;
    }
  }
}
