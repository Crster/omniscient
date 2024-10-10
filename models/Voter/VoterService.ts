import { FindCursor, ObjectId, WithId } from "mongodb";

import { VoterSchema } from "./VoterSchema";
import {
  ModifiedVoter,
  ModifiedVoterDto,
  NewVoter,
  NewVoterDto,
  VoterDto,
  VoterFilter,
  VoterFilterDto,
} from "./VoterDto";

import MongoDb, { processFilterDto } from "@/libraries/MongoDb";

export default class VoterService {
  public readonly voterCollection = MongoDb.db().collection<VoterSchema>("voters");

  async getById(voterId: string) {
    return await this.voterCollection.findOne({ _id: ObjectId.createFromHexString(voterId) });
  }

  async getList(filter: VoterFilter) {
    const filterDto = VoterFilterDto.parse(filter);

    let cursor: FindCursor;

    if (filterDto.name) {
      cursor = this.voterCollection.find({
        $or: [
          {
            "name.firstName": { $regex: filterDto.name, $options: "i" },
            "name.lastName": { $regex: filterDto.name, $options: "i" },
          },
        ],
      });
    } else if (filterDto.purok) {
      cursor = this.voterCollection.find({ "address.purok": { $regex: filterDto.purok, $options: "i" } });
    } else if (filterDto.barangay) {
      cursor = this.voterCollection.find({ "address.barangay": { $regex: filterDto.barangay, $options: "i" } });
    } else {
      cursor = this.voterCollection.find();
    }

    return await processFilterDto<VoterSchema>(cursor, filterDto);
  }

  toVoterDto(voter: WithId<VoterSchema>): VoterDto {
    return {
      voterId: voter._id.toHexString(),
      name: `${voter.name.lastName}, ${voter.name.firstName}`,
      purok: voter.address.purok,
      barangay: voter.address.barangay,
      precinctNo: "0001",
      candidate: "",
      status: "",
      validator: "",
    };
  }

  toListVoterDto(voters: WithId<VoterSchema>[]) {
    return voters.map((voter) => this.toVoterDto(voter));
  }

  async create(data: NewVoter) {
    const newVoter = NewVoterDto.parse(data);

    const voter: VoterSchema = {
      name: newVoter.name,
      address: newVoter.address,
    };

    const result = await this.voterCollection.insertOne(voter);

    return result.insertedId.toString();
  }

  async update(data: ModifiedVoter) {
    const modifiedVoter = ModifiedVoterDto.parse(data);

    const voter: VoterSchema = {
      name: modifiedVoter.name,
      address: modifiedVoter.address,
    };

    const result = await this.voterCollection.updateOne(
      { _id: ObjectId.createFromHexString(modifiedVoter.voterId) },
      { $set: voter },
    );

    return result.modifiedCount > 0;
  }
}
