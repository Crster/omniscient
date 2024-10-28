import { Candidate } from "../Candidate";

import { CandidateList } from ".";

export async function getList() {
  const candidates = await Candidate.getList();

  return candidates.map((candidate) => {
    const ret: CandidateList = {
      candidateId: candidate.candidateId as string,
      name: candidate.name,
      position: candidate.position,
      rank: 1,
      popularity: 100,
      voters: 1000,
      party: candidate.party,
      photoUrl: candidate.photoUrl,
    };

    return ret;
  });
}
