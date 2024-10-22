import { ObjectId } from "mongodb";

import { Voter } from "./Voter";
import { VoterEntity, VoterSchema } from "./VoterSchema";

import { InternalServerError, NotCreatedError, NotFoundError, NotModifiedError } from "@/libraries/Error";
import MongoDb from "@/libraries/MongoDb";

const voterCollection = MongoDb.db().collection<Voter>("voters");

export async function getById(voterId: string) {
  const result = await voterCollection.findOne({ _id: ObjectId.createFromHexString(voterId) });

  if (!result) throw new NotFoundError("Voter not found", { voterId });

  return VoterEntity.parse({ ...result, voterId: result._id.toHexString() });
}

export async function getList() {
  const result = await voterCollection.find().toArray();

  return result.map((voter) => VoterEntity.parse({ ...voter, voterId: voter._id.toHexString() }));
}

export async function create(voter: Voter) {
  const result = await voterCollection.insertOne(VoterSchema.parse(voter));

  if (result && result.acknowledged) {
    return result.insertedId.toHexString();
  }

  throw new NotCreatedError("Failed to create voter", { result });
}

export async function update(voter: Voter) {
  if (!voter.voterId) throw new InternalServerError("Voter ID is required");

  const result = await voterCollection.updateOne(
    { _id: ObjectId.createFromHexString(voter.voterId) },
    { $set: VoterSchema.optional().parse(voter) },
  );

  if (result && result.acknowledged) {
    return result.modifiedCount > 0;
  }

  throw new NotModifiedError("Failed to update voter", { result });
}

export function getFullname(voter: Voter) {
  if (voter.name.middleName) {
    return `${voter.name.lastName}, ${voter.name.firstName} ${voter.name.middleName.charAt(0)}`;
  } else {
    return `${voter.name.lastName}, ${voter.name.firstName}`;
  }
}
