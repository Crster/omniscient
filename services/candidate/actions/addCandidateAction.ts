import { CandidateRepository } from "../repository";
import { addCandidateRequest } from "../requests/addCandidateRequest";

export async function addCandidateAction(request: addCandidateRequest) {
  const candidateRepo = new CandidateRepository();
  const candidateId = await candidateRepo.create(request);

  return candidateId;
}
