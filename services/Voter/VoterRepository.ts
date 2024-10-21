import { ObjectId } from "mongodb";

import { VoterEntity } from "./VoterEntity";
import { Voter } from "./Voter";

import { InternalServerError, NotCreatedError, NotModifiedError } from "@/libraries/Error";
import MongoDb from "@/libraries/MongoDb";

export class VoterRepository {
  private voterCollection = MongoDb.db().collection<VoterEntity>("voters");

  async create(voter: Voter) {
    const result = await this.voterCollection.insertOne(voter.toEntity());

    if (result && result.acknowledged) {
      return result.insertedId.toHexString();
    }

    throw new NotCreatedError("Failed to create voter", { result });
  }

  async update(voter: Voter) {
    if (!voter.voterId) throw new InternalServerError("Voter ID is required");

    const result = await this.voterCollection.updateOne(
      { _id: ObjectId.createFromHexString(voter.voterId) },
      { $set: voter.toEntity() },
    );

    if (result && result.acknowledged) {
      return result.modifiedCount > 0;
    }

    throw new NotModifiedError("Failed to update voter", { result });
  }
}
