import { Candidate } from "../Candidate";

import { CandidateList } from ".";

export async function getList() {
  const candidates = await Candidate.getList();

  return candidates.map((candidate) => {
    const ret: CandidateList = {
      name: candidate.name,
      position: candidate.position,
      rank: 1,
      popularity: 100,
      voters: 1000,
    };

    return ret;
  });
}
