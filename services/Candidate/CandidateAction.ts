import { ObjectId } from "mongodb";

import { CandidateEntity, CandidateSchema } from "./CandidateSchema";

import { Candidate } from ".";

import MongoDb from "@/libraries/MongoDb";
import { InternalServerError, NotCreatedError, NotFoundError, NotModifiedError } from "@/libraries/Error";

const candidateCollection = MongoDb.db().collection<Candidate>("candidates");

export async function getList() {
  const data = await candidateCollection.find().toArray();

  return data.map((candidate) => CandidateEntity.parse({ ...candidate, candidateId: candidate._id.toHexString() }));
}

export async function getById(candidateId: string) {
  const data = await candidateCollection.findOne({ _id: ObjectId.createFromHexString(candidateId) });

  if (!data) throw new NotFoundError("Candidate not found", { candidateId });

  return CandidateEntity.parse({ ...data, candidateId: data._id.toHexString() });
}

export async function create(candidate: Candidate) {
  const result = await candidateCollection.insertOne(CandidateSchema.parse(candidate));

  if (result && result.acknowledged) {
    return result.insertedId.toHexString();
  }

  throw new NotCreatedError("Failed to create canidate", { result });
}

export async function update(candidate: Candidate) {
  if (!candidate.candidateId) throw new InternalServerError("Candidate ID is required", { candidate });

  const result = await candidateCollection.updateOne(
    { _id: ObjectId.createFromHexString(candidate.candidateId) },
    { $set: CandidateSchema.optional().parse(candidate) },
  );

  if (result && result.acknowledged) {
    return result.modifiedCount > 0;
  }

  throw new NotModifiedError("Failed to update candidate", { result });
}
