import { FindCursor, ObjectId, WithId } from "mongodb";

import { Genders } from "../Voter/VoterSchema";

import { CandidateSchema } from "./CandidateSchema";
import {
  CandidateDto,
  CandidateFilter,
  CandidateFilterDto,
  ModifiedCandidate,
  ModifiedCandidateDto,
  NewCandidate,
  NewCandidateDto,
} from "./CandidateDto";

import MongoDb, { processFilterDto } from "@/libraries/MongoDb";
import { removeEmptyString } from "@/libraries/Generator";

export default class CandidateService {
  private readonly candidateCollection = MongoDb.db().collection<CandidateSchema>("candidates");

  async getById(candidateId: string) {
    return await this.candidateCollection.findOne({ _id: ObjectId.createFromHexString(candidateId) });
  }

  async getList(filter: CandidateFilter) {
    const filterDto = CandidateFilterDto.parse(filter);

    let cursor: FindCursor;

    if (filterDto?.name) {
      cursor = this.candidateCollection.find({ name: { $regex: new RegExp(filterDto.name, "i") } });
    } else if (filterDto?.party) {
      cursor = this.candidateCollection.find({ party: { $regex: new RegExp(filterDto.party, "i") } });
    } else if (filterDto?.position) {
      cursor = this.candidateCollection.find({ position: { $regex: new RegExp(filterDto.position, "i") } });
    } else {
      cursor = this.candidateCollection.find();
    }

    return await processFilterDto<CandidateSchema>(cursor, filterDto);
  }

  toCandidateDto(candidate: WithId<CandidateSchema>): CandidateDto {
    const gender = candidate.gender || Genders.Male;
    const photoUrl = candidate.photoUrl || `https://ui-avatars.com/api/?format=png&name=${gender}`;

    return {
      candidateId: candidate._id.toHexString(),
      name: candidate.name,
      position: candidate.position,
      party: candidate.party || "",
      gender: gender,
      photoUrl: photoUrl,
      voters: 0,
    };
  }

  toListCandidateDto(candidates: WithId<CandidateSchema>[]) {
    return candidates.map((candidate) => this.toCandidateDto(candidate));
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
