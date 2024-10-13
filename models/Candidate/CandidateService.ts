import { ObjectId } from "mongodb";

import { CandidateSchema } from "./CandidateSchema";
import { ModifiedCandidate, ModifiedCandidateDto, NewCandidate, NewCandidateDto } from "./CandidateDto";

import MongoDb from "@/libraries/MongoDb";
import { removeEmptyString } from "@/libraries/Generator";

export default class CandidateService {
  private readonly candidateCollection = MongoDb.db().collection<CandidateSchema>("candidates");

  async getById(candidateId: string) {
    return await this.candidateCollection.findOne({ _id: ObjectId.createFromHexString(candidateId) });
  }

  async create(data: NewCandidate) {
    const newCandidate = NewCandidateDto.parse(removeEmptyString(data));

    const candidate: CandidateSchema = {
      name: newCandidate.name,
      address: newCandidate.address,
      position: newCandidate.position,
      party: newCandidate.party,
      coalition: newCandidate.coalition,
      alias: newCandidate.alias,
      gender: newCandidate.gender,
      photoUrl: newCandidate.photoUrl,
      email: newCandidate.email,
      mobileNo: newCandidate.mobileNo,
    };

    const result = await this.candidateCollection.insertOne(candidate);

    return result.insertedId.toString();
  }

  async update(candidateId: string, data: ModifiedCandidate) {
    const modifiedCandidate = ModifiedCandidateDto.parse(removeEmptyString(data));

    const result = await this.candidateCollection.updateOne(
      { _id: ObjectId.createFromHexString(candidateId) },
      { $set: modifiedCandidate },
    );

    return result.modifiedCount > 0;
  }

  async remove(candidateId: string) {
    const result = await this.candidateCollection.findOneAndDelete({ _id: ObjectId.createFromHexString(candidateId) });

    return result;
  }
}
