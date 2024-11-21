import { Candidate, CandidateSimpleDto } from "../model";

export function createCandidateSimplePresenter(candidate: Candidate): CandidateSimpleDto {
  return {
    candidateId: candidate.candidateId,
    name: candidate.name,
    position: candidate.position,
    photoUrl: candidate.photoUrl || "",
    party: candidate.party || "",
  };
}
