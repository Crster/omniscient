import { Candidate } from "./Candidate";
import { Position } from "./Position";

export type CandidateList = {
  candidateId: string;
  rank: number;
  name: string;
  photoUrl: string;
  party: string;
  position: Position;
  voters: number;
  popularity: number;
};

export const CandidateList = {
  async generate() {
    const result = await Candidate.collection.find({}).toArray();

    return result.map((item) => {
      const ret: CandidateList = {
        candidateId: item._id.toHexString(),
        rank: 0,
        name: item.name,
        position: item.position,
        photoUrl: item.photoUrl,
        party: item.party,
        voters: 0,
        popularity: 0,
      };

      return ret;
    });
  },
};
