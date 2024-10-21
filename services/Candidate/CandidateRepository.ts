import { ObjectId } from "mongodb";

import { CandidateEntity } from "./CandidateEntity";
import { Candidate } from "./Candidate";

import MongoDb from "@/libraries/MongoDb";
import { InternalServerError, NotCreatedError, NotFoundError, NotModifiedError } from "@/libraries/Error";

export class CandidateRepository {
  private candidateCollection = MongoDb.db().collection<CandidateEntity>("candidates");

  async getById(candidateId: string) {
    const data = await this.candidateCollection.findOne({ _id: ObjectId.createFromHexString(candidateId) });

    if (!data) throw new NotFoundError("Candidate not found", { candidateId });

    return Candidate.fromRepository(data);
  }

  async create(candidate: Candidate) {
    const result = await this.candidateCollection.insertOne(candidate.toEntity());

    if (result && result.acknowledged) {
      return result.insertedId.toHexString();
    }

    throw new NotCreatedError("Failed to create canidate", { result });
  }

  async update(candidate: Candidate) {
    if (!candidate.candidateId) throw new InternalServerError("Candidate ID is required", { candidate });

    const result = await this.candidateCollection.updateOne(
      { _id: ObjectId.createFromHexString(candidate.candidateId) },
      { $set: candidate.toEntity() },
    );

    if (result && result.acknowledged) {
      return result.modifiedCount > 0;
    }

    throw new NotModifiedError("Failed to update candidate", { result });
  }
}
