import { ObjectId, WithId } from "mongodb";

import { Candidate, ICandidate } from "./model";

import { openCollection } from "@/libraries/Database";

export class CandidateRepository {
  private _candidateCollection = openCollection<ICandidate>("candidates");

  private toCandidate(candidate: WithId<ICandidate> | null): Candidate | undefined {
    if (candidate) {
      return {
        name: candidate.name,
        address: candidate.address,
        alias: candidate.alias,
        coalition: candidate.coalition,
        gender: candidate.gender,
        party: candidate.party,
        position: candidate.position,
        email: candidate.email,
        mobileNo: candidate.mobileNo,
        photoUrl: candidate.photoUrl,
        candidateId: candidate._id.toHexString(),
      };
    }
  }

  async getById(candidateId: string) {
    const result = await this._candidateCollection.findOne({ _id: ObjectId.createFromHexString(candidateId) });

    return this.toCandidate(result);
  }

  async getList(filter?: string) {
    const result: Array<Candidate> = [];

    const cursor = filter
      ? this._candidateCollection.find({ name: { $regex: filter } })
      : this._candidateCollection.find({}, { limit: 1000 });

    for await (const item of cursor) {
      result.push(this.toCandidate(item) as Candidate);
    }

    return result;
  }

  async create(candidate: ICandidate) {
    const result = await this._candidateCollection.insertOne(candidate);

    if (result.acknowledged) {
      return result.insertedId.toHexString();
    }
  }

  async update(candidateId: string, update: Partial<ICandidate>) {
    const result = await this._candidateCollection.updateOne(
      { _id: ObjectId.createFromHexString(candidateId) },
      { $set: update },
    );

    return result.acknowledged;
  }

  async remove(candidateId: string) {
    const result = await this._candidateCollection.deleteOne({ _id: ObjectId.createFromHexString(candidateId) });

    return result.acknowledged;
  }
}
