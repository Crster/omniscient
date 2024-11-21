import { Candidate, ICandidate } from "./model";

import { BaseRepository } from "@/libraries/BaseRepository";

export class CandidateRepository extends BaseRepository<Candidate, ICandidate> {
  constructor() {
    super("candidates", (candidate) => {
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
    });
  }

  async getListByName(filter?: string) {
    return filter ? await super.getList({ name: { $regex: filter, $options: "i" } }) : await super.getList();
  }

  async getListByPosition(position: string) {
    return await super.getList({ position });
  }
}
