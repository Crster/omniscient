import { Candidate, CandidateDto } from "../model";

export function createCandidatePresenter(candidate: Candidate): CandidateDto {
  return {
    candidateId: candidate.candidateId,
    name: candidate.name,
    position: candidate.position,
    party: candidate.party,
    photoUrl: candidate.photoUrl,
    rank: "1",
    voters: 0,
    popularity: 0,
  };
}
