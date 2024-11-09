import { ObjectId, WithId } from "mongodb";

import { IVoter, Voter } from "./model";

import { openCollection } from "@/libraries/Database";

export class VoterRepository {
  private _voterCollection = openCollection<IVoter>("voters");

  private toVoter(voter: WithId<IVoter> | null): Voter | undefined {
    if (voter) {
      return {
        name: voter.name,
        email: voter.email,
        address: voter.address,
        birthDate: voter.birthDate,
        gender: voter.gender,
        civilStatus: voter.civilStatus,
        family: voter.family,
        mobileNo: voter.mobileNo,
        placeOfBirth: voter.placeOfBirth,
        precinctNo: voter.precinctNo,
        socialGroup: voter.socialGroup,
        tin: voter.tin,
        citizenship: voter.citizenship,
        occupation: voter.occupation,
        voterId: voter._id.toHexString(),
      };
    }
  }

  async getById(voterId: string) {
    const result = await this._voterCollection.findOne({ _id: ObjectId.createFromHexString(voterId) });

    return this.toVoter(result);
  }

  async getList(filter?: string) {
    const result: Array<Voter> = [];

    const cursor = filter
      ? this._voterCollection.find({ email: { $regex: filter } })
      : this._voterCollection.find({}, { limit: 1000 });

    for await (const item of cursor) {
      result.push(this.toVoter(item) as Voter);
    }

    return result;
  }

  async create(voter: IVoter) {
    const result = await this._voterCollection.insertOne(voter);

    if (result.acknowledged) {
      return result.insertedId.toHexString();
    }
  }

  async update(voterId: string, update: Partial<IVoter>) {
    const result = await this._voterCollection.updateOne(
      { _id: ObjectId.createFromHexString(voterId) },
      { $set: update },
    );

    return result.acknowledged;
  }

  async remove(voterId: string) {
    const result = await this._voterCollection.deleteOne({ _id: ObjectId.createFromHexString(voterId) });

    return result.acknowledged;
  }
}
